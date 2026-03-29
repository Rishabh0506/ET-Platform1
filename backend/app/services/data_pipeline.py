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

def _seed_articles():
    seed_data = [
        {
            "id": "seed-1001",
            "headline": "Sensex Plunges 1000 Points as Global Selloff Spooks Investors; Nifty Below 22000",
            "source": "Markets",
            "generated_at": "2026-03-29 09:00:00",
            "content": "Indian equity indices witnessed a massive selloff on Monday, mirroring weakness in global markets. The BSE Sensex plummeted over 1000 points, breaching key psychological levels, while the NSE Nifty 50 slipped below the critical 22,000 mark. Heavy selling was witnessed across all major sectors, with IT, banking, and financials leading the decline.\n\nMarket analysts attributed the sharp fall to a combination of factors, including rising bond yields in the US, concerns over persistently high inflation, and fears of aggressive rate hikes by the Federal Reserve. Foreign Institutional Investors (FIIs) also continued their selling spree, further dampening sentiment on Dalal Street. The broader markets also faced significant selling pressure, with midcap and smallcap indices suffering sharp cuts.\n\nInvestors are now closely monitoring upcoming macroeconomic data and corporate earnings to gauge the market's future trajectory. Experts suggest maintaining a cautious approach and focusing on fundamentally strong stocks with clear earnings visibility amidst the current volatility."
        },
        {
            "id": "seed-1002",
            "headline": "RBI Maintains Status Quo on Repo Rate at 6.5%; Stresses on Managing Inflation Expectations",
            "source": "Top Stories",
            "generated_at": "2026-03-29 09:15:00",
            "content": "The Reserve Bank of India's (RBI) Monetary Policy Committee (MPC) unanimously decided to keep the benchmark repo rate unchanged at 6.5% for the seventh consecutive time. RBI Governor Shaktikanta Das announced the decision, emphasizing the central bank's commitment to progressively align inflation with its 4% target while supporting economic growth.\n\nThe central bank acknowledged that while core inflation has steadily declined, unpredictable food prices pose a significant risk to the overall inflation trajectory. The RBI maintained its policy stance of 'withdrawal of accommodation' to ensure that inflation remains firmly within the target band. The GDP growth forecast for the current fiscal year was retained at a robust 7%.\n\nIndustry experts welcomed the RBI's balanced approach, noting that the steady repo rate will provide stability to the housing and automotive sectors. Borrowers can breathe a sigh of relief as Equated Monthly Installments (EMIs) will remain steady for now, providing a boost to consumer sentiment during the upcoming festival season."
        },
        {
            "id": "seed-1003",
            "headline": "India's GDP Growth Estimated at 7.3% for FY26: World Bank Upgrades Outlook",
            "source": "Top Stories",
            "generated_at": "2026-03-29 10:00:00",
            "content": "In a major positive development, the World Bank has revised India's GDP growth forecast upwards to 7.3% for the fiscal year 2025-26. The multilateral agency cited strong domestic demand, robust infrastructure spending, and resilient private consumption as key drivers behind the upgraded outlook. This projection positions India as the fastest-growing major economy globally.\n\nThe report highlighted the success of various government initiatives, such as the Production Linked Incentive (PLI) scheme, in boosting manufacturing and exports. It also noted significant improvements in formal employment, which supports sustained consumer spending. However, the World Bank cautioned against potential headwinds, including geopolitical tensions and weaker external demand.\n\nEconomists have lauded the forecast, pointing out that India's macroeconomic fundamentals remain exceptionally stable in an otherwise uncertain global environment. Increased capital expenditure by the government is expected to crowd in private investment, creating a multiplier effect that could sustain high growth rates over the coming decade."
        },
        {
            "id": "seed-1004",
            "headline": "Indian Startups Raise $2 Billion in Q1 2026; Fintech and GenAI Emerge as Top Draws",
            "source": "Markets",
            "generated_at": "2026-03-29 10:30:00",
            "content": "Funding for Indian startups has seen a significant resurgence in the first quarter of 2026, with top-tier firms raising over $2 billion across various funding rounds. This marks a sharp recovery from the prolonged funding winter that plagued the ecosystem in previous years. Late-stage funding led the chart, accounting for nearly 60% of the total capital raised, indicating renewed investor confidence in proven business models.\n\nFinancial technology (Fintech) and Generative Artificial Intelligence (GenAI) startups were the primary beneficiaries of this fresh capital influx. Several high-profile AI startups secured massive rounds to scale up their foundational models and enterprise solutions. Investors are increasingly looking for companies with clear paths to profitability and strong unit economics, moving away from the growth-at-all-costs mindset.\n\nIndustry veterans believe this renewed funding activity will spur innovation and job creation across the tech sector. Furthermore, a steady pipeline of matured startups preparing for Initial Public Offerings (IPOs) later this year is expected to attract further foreign capital into the Indian venture capital ecosystem."
        },
        {
            "id": "seed-1005",
            "headline": "Crude Oil Prices Surge Past $90 a Barrel Amid Middle East Escalation; India on Alert",
            "source": "Top Stories",
            "generated_at": "2026-03-29 11:00:00",
            "content": "Global crude oil prices experienced a sharp spike, crossing the critical $90 per barrel threshold following renewed geopolitical tensions in the Middle East. Brent crude futures rallied substantially as supply disruption fears gripped the global energy markets. The sudden escalation restricts key shipping routes, forcing traders to reassess global supply inventories.\n\nFor India, which imports over 80% of its crude oil requirements, this surge poses a major macroeconomic challenge. Government officials stated they are closely monitoring the situation to cushion the impact on domestic retail fuel prices. A sustained rise in crude oil prices typically widens India's current account deficit and stokes imported inflation, putting pressure on the Rupee.\n\nEnergy analysts warn that if prices stay elevated above $90, it could disrupt the RBI's inflation management objectives. Oil marketing companies are currently absorbing the margin impact, but a prolonged conflict could force price hikes at the pump, negatively impacting the logistics and transportation sectors."
        },
        {
            "id": "seed-1006",
            "headline": "Top Indian IT Firms Announce Aggressive Hiring Plans for FY26; Focus Shifts to AI Talent",
            "source": "Markets",
            "generated_at": "2026-03-29 11:45:00",
            "content": "India's leading Information Technology (IT) services companies have announced robust hiring targets for the upcoming fiscal year, signaling a revival in sectoral demand. After a period of muted hiring and tightened bench strength, major firms like TCS, Infosys, and Wipro are aiming to recruit thousands of fresh engineering graduates and experienced professionals. \n\nThe demand heavily skews towards specific niche skills, primarily Artificial Intelligence, Machine Learning, Cloud Architecture, and Cybersecurity. Companies are actively retraining their existing workforce through massive internal upskilling programs to meet client requirements for digital transformation projects. The shift represents a structural change in the industry towards high-value consulting services.\n\nHR experts note that campus placements at premier engineering institutes are seeing competitive bidding for top talent, driving up entry-level compensation packages for the first time in three years. The aggressive hiring outlook is a positive indicator for India's services exports and overall employment generation in major IT hubs."
        },
        {
            "id": "seed-1007",
            "headline": "Union Budget 2026: Finance Minister Unveils Massive Infrastructure Push and Middle-Class Tax Relief",
            "source": "Top Stories",
            "generated_at": "2026-03-29 12:30:00",
            "content": "The Union Budget 2026 has laid out an ambitious roadmap for 'Viksit Bharat', balancing aggressive capital expenditure with much-anticipated relief for honest taxpayers. The Finance Minister allocated a record ₹12 lakh crore towards infrastructure development, focusing heavily on modernizing railways, expanding national highways, and upgrading port logistics. This sustained capex push is designed to firmly cement India's position as a global manufacturing alternative.\n\nIn a major cheer for the salaried class, the basic exemption limit under the new tax regime was marginally increased, and standard deduction limits were revised upwards. These changes are expected to increase disposable income in the hands of the middle class, thereby spurring consumption across fast-moving consumer goods and auto sectors.\n\nCorporate leaders have praised the budget's fiscal prudence, noting that the government managed to stick to its fiscal consolidation path without sacrificing growth. The projected fiscal deficit for the upcoming year was successfully pegged down to 4.9% of GDP, ensuring macro stability while keeping borrowing costs manageable."
        },
        {
            "id": "seed-1008",
            "headline": "Gold Prices Hit Historic Record Highs of ₹75,000 per 10 Grams on Strong Global Cues",
            "source": "Markets",
            "generated_at": "2026-03-29 13:15:00",
            "content": "The yellow metal's relentless rally continues as domestic gold prices breached the historic ₹75,000 mark per 10 grams for the first time ever. The surge in domestic markets closely tracked international spot gold prices, which touched record highs amidst aggressive buying by global central banks, particularly those in Asia and Eastern Europe seeking to diversify foreign exchange reserves.\n\nRetail investors and safe-haven seekers also flocked to the precious metal amidst lingering concerns over the global economic slowdown and persistent geopolitical uncertainties. In the local spot market, jewelers reported mixed reactions—while investment demand via digital gold and sovereign gold bonds surged, physical jewelry sales experienced a slight dip due to affordability constraints.\n\nMarket analysts remain bullish on gold's long-term trajectory, predicting that prices will remain elevated through the remainder of the year. The expected pivot in the US Federal Reserve's monetary policy towards interest rate cuts is widely seen as a major catalyst that will further weaken the Dollar index, traditionally boosting gold prices."
        },
        {
            "id": "seed-1009",
            "headline": "India-US High-Technology Trade Deal Signed; Expected to Boost Semiconductor Manufacturing",
            "source": "Top Stories",
            "generated_at": "2026-03-29 14:00:00",
            "content": "India and the United States have formally signed a landmark High-Technology Trade and Defense pact, culminating months of intense bilateral negotiations. The agreement fundamentally aims to streamline export controls and facilitate seamless technology transfers between the two allied nations, specifically targeting emerging sectors such as artificial intelligence, quantum computing, and space exploration.\n\nA significant component of the deal focuses on securing critical supply chains, particularly for semiconductor manufacturing. Major US tech giants are expected to announce joint ventures with Indian conglomerates to establish cutting-edge fabrication plants and design centers across India. This perfectly aligns with the Indian government's 'Make in India' initiative and strategic goal of self-reliance in electronics.\n\nDiplomatic experts view the pact as a monumental shift in the geopolitical landscape of the Indo-Pacific region. The partnership not only enhances India's strategic defense capabilities but also firmly integrates the Indian manufacturing sector into global high-tech supply chains, significantly reducing dependency on traditional East Asian manufacturing hubs."
        },
        {
            "id": "seed-1010",
            "headline": "Electric Vehicle Market in India Enters Hyper-Growth Phase as Passenger EV Sales Double",
            "source": "Markets",
            "generated_at": "2026-03-29 15:30:00",
            "content": "The transition to electric mobility in India has crossed a critical tipping point, with passenger Electric Vehicle (EV) sales practically doubling compared to the previous year. New data from industry associations highlights that EVs now account for nearly 8% of all new automobile registrations, largely driven by expanded charging infrastructure, aggressive launch pipelines from legacy automakers, and sustained government subsidies.\n\nTwo-wheeler and three-wheeler segments continue to dominate sheer volume, witnessing robust adoption in Tier-2 and Tier-3 cities for last-mile delivery and daily commuting. However, the passenger car segment is experiencing the fastest growth rate, fueled by the introduction of affordable EV models by major domestic manufacturers that boast improved battery ranges and robust safety features.\n\nDespite the remarkable growth, the industry faces structural challenges, including localized battery cell manufacturing and raw material procurement. The government has aggressively pushed for domestic battery fabrication through its updated PLI scheme, aiming to dramatically lower the upfront acquisition cost for consumers over the next three years."
        }
    ]
    try:
        with open(ARTICLES_FILE, "w", encoding="utf-8") as f:
            json.dump(seed_data, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"Error seeding to {ARTICLES_FILE}: {e}")
    return seed_data

def _load_articles():
    if not os.path.exists(ARTICLES_FILE):
        return _seed_articles()
    try:
        with open(ARTICLES_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            if isinstance(data, list) and len(data) > 0:
                return data
            return _seed_articles()
    except Exception as e:
        print(f"File exists but error reading {ARTICLES_FILE}: {e}")
        return _seed_articles()

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
