import feedparser
import time
import uuid
import datetime
import random
import json
import os
import threading
from .llm_provider import get_llm_provider

# Configuration
TOP_STORIES_URL = "https://economictimes.indiatimes.com/rssfeedstopstories.cms"
MARKETS_URL = "https://economictimes.indiatimes.com/rssfeeds/19770530.cms"
ARTICLES_FILE = "articles.json"
MAX_CAP = 100

# In-memory cache for the frontend API
_cached_articles = []
_file_lock = threading.Lock()

def _load_articles():
    if not os.path.exists(ARTICLES_FILE):
        return []
    try:
        with open(ARTICLES_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            if isinstance(data, list):
                return data
            return []
    except Exception as e:
        print(f"File exists but error reading {ARTICLES_FILE}: {e}")
        return []

def _save_articles(articles_list):
    try:
        with open(ARTICLES_FILE, "w", encoding="utf-8") as f:
            json.dump(articles_list, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"Error saving to {ARTICLES_FILE}: {e}")

def _fetch_headlines(url, count=5):
    try:
        feed = feedparser.parse(url)
        entries = feed.entries
        if len(entries) > count:
            return random.sample(entries, count)
        return entries
    except Exception as e:
        print(f"Error fetching RSS from {url}: {e}")
        return []

def initialize_cache():
    global _cached_articles
    
    with _file_lock:
        print(f"Loading existing articles from {ARTICLES_FILE}...")
        stored_articles = _load_articles()
        
        # Build set of existing headlines for deduplication O(1)
        existing_headlines = {art.get("headline", "").strip() for art in stored_articles if art.get("headline")}

        print("Fetching Top Stories and Markets RSS feeds...")
        top_entries = _fetch_headlines(TOP_STORIES_URL, 5)
        market_entries = _fetch_headlines(MARKETS_URL, 5)

        # Assemble candidates with their source origin
        candidates = []
        for e in top_entries:
            candidates.append((e, "Top Stories"))
        for e in market_entries:
            candidates.append((e, "Markets"))

        # Deduplicate
        new_candidates = []
        for entry, source in candidates:
            headline = getattr(entry, "title", "").strip()
            if headline and headline not in existing_headlines:
                new_candidates.append((entry, source))
                # Add it immediately to existing_headlines in case of internal dupes in the RSS feeds themselves
                existing_headlines.add(headline)
            else:
                print(f"Skipping duplicate: {headline}")

        if not new_candidates:
            print("No new headlines found. Retaining existing stored articles.")
        else:
            llm_provider = get_llm_provider()
            generated = []

            for entry, source in new_candidates:
                headline = getattr(entry, "title", "").strip()
                summary = getattr(entry, "summary", "").strip()
                
                print(f"Generating AI article for: {headline}")
                try:
                    expanded_body = llm_provider.generate_article(headline=headline, summary=summary)
                    
                    # Error handling resilience: If fallback message happens, we skip saving it
                    if not expanded_body or "Failed to generate expanded article due to an API error" in expanded_body:
                        print(f"Skipping failed generation for: {headline}")
                        continue
                        
                    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

                    article_obj = {
                        "id": str(uuid.uuid4()),
                        "headline": headline,
                        "source": source,
                        "generated_at": current_time,
                        "content": expanded_body
                    }
                    generated.append(article_obj)
                except Exception as e:
                    print(f"Unexpected error expanding {headline}: {e}")

            if generated:
                stored_articles.extend(generated)
                print(f"Successfully appended {len(generated)} new articles.")

                # Apply Cap Logic
                if len(stored_articles) > MAX_CAP:
                    # Sort descending by generated_at string (newer dates > older dates)
                    stored_articles.sort(key=lambda x: x.get("generated_at", ""), reverse=True)
                    stored_articles = stored_articles[:MAX_CAP]
                    print(f"Trimming old records: Capped to {MAX_CAP} articles.")
                
                # Save purely to Local JSON Disk
                _save_articles(stored_articles)

        print("Mapping JSON schema to RAM object...")
        ram_list = []
        for a in stored_articles:
            ram_copy = a.copy()
            # Fulfill the frontend interface requirements without changing UI code
            if "content" in ram_copy:
                ram_copy["body"] = ram_copy.pop("content")
            if "source" in ram_copy:
                ram_copy["category"] = ram_copy.pop("source")
            
            # Map generated_at to timestamp if not present
            if "generated_at" in ram_copy:
                ram_copy["timestamp"] = ram_copy.pop("generated_at")
            
            ram_list.append(ram_copy)

        # Update Live RAM list
        ram_list.sort(key=lambda x: x.get("timestamp", ""), reverse=True)
        _cached_articles = ram_list
        print(f"Cache successfully populated with {_cached_articles.__len__()} total articles!")

def get_cached_articles():
    global _cached_articles
    if not _cached_articles:
        initialize_cache()
    return _cached_articles
