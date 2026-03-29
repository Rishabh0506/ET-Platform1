import DailyBrief from "@/components/my-et/DailyBrief";
import VernacularFeed from "@/components/my-et/VernacularFeed";
import LiveImpactStrip from "@/components/my-et/LiveImpactStrip";
import DashboardSidebar from "@/components/my-et/DashboardSidebar";
import { getArticles } from "@/lib/api/articles";
import Link from "next/link";

// --- Image URL Helper (LoremFlickr Mapping) ---
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
}

export const metadata = {
  title: "Your Command Center | ET AI",
  description: "Elite financial intelligence dashboard adapted for you.",
};

export const dynamic = "force-dynamic";

export default async function MyET() {
  // Fetch live AI-expanded news
  let activeArticles = [];
  try {
    const res = await getArticles();
    if (res && Array.isArray(res)) activeArticles = res;
  } catch (err) {}

  const topStories = activeArticles.slice(0, 5);

  return (
    <main className="min-h-screen bg-off-white pb-20 bg-grid-finance">
      {/* 1. Real-time Live Impact Strip (Global Alert) */}
      <LiveImpactStrip />

      <div className="max-w-[1440px] mx-auto px-6 pt-12">
        
        {/* 2. Immersive Hero - Command Center Greeting */}
        <section className="relative mb-20 p-12 lg:p-16 bg-white border border-slate-100 shadow-layered overflow-hidden rounded-sm group">
          {/* Subtle Background Radial Depth */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-50/50 to-transparent pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-red-800/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <div className="relative z-10 w-full">
            <h2 className="text-[#C0001D] font-bold text-sm uppercase mb-4">
              TODAY'S TOP STORIES
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              {topStories.length > 0 ? (
                topStories.map((article, idx) => (
                  <Link key={idx} href={`/article/${article?.id}`} className="flex-1 min-w-[180px] bg-white rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform">
                    <img 
                      src={getImageUrl(article?.headline, 400, 220)} 
                      alt={article?.headline || "News"} 
                      className="w-full h-[200px] object-cover" 
                     loading="lazy" />
                    <div className="p-3 bg-white">
                      <h3 className="font-serif font-bold text-[14px] leading-snug text-[#1A1A1A] line-clamp-3 group-hover:text-[#C0001D] transition-colors">
                        {article?.headline || "Loading..."}
                      </h3>
                    </div>
                  </Link>
                ))
              ) : (
                [1, 2, 3, 4, 5].map((idx) => (
                  <div key={idx} className="flex-1 min-w-[180px] bg-white rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col">
                    <div className="w-full h-[200px] bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 font-bold text-[12px]">Image...</span>
                    </div>
                    <div className="p-3 bg-white">
                      <h3 className="font-serif font-bold text-[14px] leading-snug text-[#1A1A1A]">
                        Loading...
                      </h3>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* 4. Main Intelligence Grid (3-Tier Content) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Feed Column */}
          <div className="lg:col-span-8 flex flex-col gap-24">
            
            {/* Tier 1: Live Daily Brief */}
            <section className="relative group">
              <div className="absolute -left-12 top-0 bottom-0 w-px bg-slate-200 group-hover:bg-red-800 transition-colors"></div>
              <DailyBrief />
            </section>

            {/* Tier 2: Personalized Command Feed */}
            <section className="relative">
              <div className="flex flex-col gap-6 mb-16 px-2">
                <div className="flex items-center gap-4">
                   <div className="h-px w-12 bg-slate-950"></div>
                   <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-950 italic">
                     Critical Intelligence Feed
                   </h2>
                   <div className="h-px flex-1 bg-slate-100"></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Command Monitor ACTIVE • AI DETECTING ANOMALIES</span>
                </div>
              </div>

              <VernacularFeed articles={activeArticles} />
            </section>
          </div>

          {/* 5. Right AI Command Center Sidebar */}
          <div className="lg:col-span-4">
            <DashboardSidebar />
          </div>
        </div>
      </div>
    </main>
  );
}
