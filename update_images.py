import sys
import re

lorem_fn = '''// --- Image URL Helper (LoremFlickr Mapping) ---
function getImageUrl(headline, width = 400, height = 250) {
  if (!headline || headline.trim() === "") {
    return `https://loremflickr.com/${width}/${height}/business,news`;
  }

  const h = headline.toLowerCase();

  const keywordMap = [
    { match: ["sensex", "nifty", "stock", "market", "bse", "nse"],  
      flickr: "stock,market" },
    { match: ["gold", "silver", "commodity"],                        
      flickr: "gold,finance" },
    { match: ["oil", "crude", "petroleum"],                          
      flickr: "oil,energy" },
    { match: ["bank", "rbi", "lending", "rate", "repo"],             
      flickr: "bank,finance" },
    { match: ["budget", "tax", "fiscal"],                            
      flickr: "budget,government" },
    { match: ["economy", "gdp", "growth", "inflation"],              
      flickr: "economy,finance" },
    { match: ["startup", "venture", "funding", "unicorn"],           
      flickr: "startup,office" },
    { match: ["ipo", "listing", "shares"],                           
      flickr: "investment,finance" },
    { match: ["crypto", "bitcoin", "blockchain"],                    
      flickr: "cryptocurrency,digital" },
    { match: ["ai", "artificial intelligence", "machine learning"],  
      flickr: "artificial,intelligence" },
    { match: ["tech", "software", "digital", "it sector"],           
      flickr: "technology,computer" },
    { match: ["ev", "electric vehicle", "tesla"],                    
      flickr: "electric,car" },
    { match: ["energy", "solar", "renewable", "power"],              
      flickr: "solar,energy" },
    { match: ["climate", "environment", "pollution"],                
      flickr: "environment,nature" },
    { match: ["modi", "parliament", "government", "minister"],       
      flickr: "india,government" },
    { match: ["india", "delhi", "mumbai", "bengaluru"],              
      flickr: "india,city" },
    { match: ["election", "vote", "poll"],                           
      flickr: "election,voting" },
    { match: ["politics", "party", "congress", "bjp"],               
      flickr: "politics,government" },
    { match: ["trump", "biden", "white house", "america", "us "],    
      flickr: "america,politics" },
    { match: ["china", "beijing", "chinese"],                        
      flickr: "china,city" },
    { match: ["iran", "middle east", "gulf"],                        
      flickr: "middleeast,desert" },
    { match: ["war", "conflict", "military", "army"],                
      flickr: "military,defense" },
    { match: ["trade", "export", "import", "wto"],                   
      flickr: "trade,shipping" },
    { match: ["cricket", "ipl", "bcci", "kohli", "rohit"],          
      flickr: "cricket,sport" },
    { match: ["f1", "formula", "racing", "grand prix"],              
      flickr: "formula1,racing" },
    { match: ["sport", "football", "tennis", "athlete"],             
      flickr: "sport,athlete" },
    { match: ["real estate", "property", "housing", "home loan"],    
      flickr: "realestate,building" },
    { match: ["pharma", "drug", "medicine", "health"],               
      flickr: "medicine,health" },
  ];

  for (const entry of keywordMap) {
    for (const word of entry.match) {
      if (h.includes(word)) {
        return `https://loremflickr.com/${width}/${height}/${entry.flickr}`;
      }
    }
  }

  // Default fallback
  return `https://loremflickr.com/${width}/${height}/business,news`;
}'''

def process(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        code = f.read()

    # 1. Remove TOPIC_IMAGES
    code = re.sub(r'const TOPIC_IMAGES = \{.*?\};\n\n', '', code, flags=re.DOTALL)
    
    # 2. Replace getImageUrl function block
    code = re.sub(r'// --- Image URL Helper.*?function getImageUrl[^{]*\{.*?\n\}\n', lorem_fn + '\n', code, flags=re.DOTALL)

    # 3. Fix getImageUrl calls: remove idx or 0.
    code = re.sub(r'(getImageUrl\([^,]+),\s*(?:\d+|idx),\s*(\d+),\s*(\d+)\)', r'\1, \2, \3)', code)

    # 4. Add loading="lazy" to <img> tags.
    def img_repl(match):
        img_tag = match.group(0)
        if 'loading=' not in img_tag:
            return img_tag.replace('/>', ' loading="lazy" />')
        return img_tag
    code = re.sub(r'<img\b[^>]+/>', img_repl, code)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(code)

process('frontend/src/app/page.jsx')
process('frontend/src/app/my-et/page.jsx')
print("Transformation successful!")
