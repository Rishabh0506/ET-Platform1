import Link from "next/link";
import { getArticles } from "@/lib/api/articles";

export const dynamic = "force-dynamic";

// --- Markdown Cleanser ---
function cleanExcerpt(body) {
  if (!body) return "";
  let clean = body;
  
  // 1. Remove all ** markers
  clean = clean.replace(/\*\*/g, '');
  
  // 2. Remove internal headers and separators
  clean = clean.split('\n').filter(line => {
    const l = line.trim();
    if (l.startsWith("Headline:")) return false;
    if (l.startsWith("Summary:")) return false;
    if (l.startsWith("Article:")) return false;
    if (l.startsWith("---")) return false;
    if (l === "") return false;
    return true;
  }).join(' ').replace(/\s+/g, ' ').trim();

  // 3. Truncate
  if (clean.length > 150) {
    clean = clean.substring(0, 150).trim() + "...";
  }
  return clean;
}

// --- Image URL Helper (Picsum Mapping) ---
function getImageUrl(headline, width = 400, height = 250) {
  const h = headline ? headline.toLowerCase() : "";
  const keywordMap = {
    "trump": "politics",
    "iran": "military",
    "war": "conflict",
    "market": "finance",
    "sensex": "stockmarket",
    "nifty": "trading",
    "gold": "gold",
    "india": "india",
    "modi": "government",
    "economy": "economy",
    "bank": "banking",
    "tech": "technology",
    "ai": "technology",
    "startup": "business",
    "ipo": "finance",
    "crypto": "digital",
    "bitcoin": "crypto",
    "election": "voting",
    "f1": "racing",
    "cricket": "sport",
    "ipl": "cricket",
    "climate": "nature",
    "energy": "power",
    "china": "asia",
    "fed": "federal",
    "inflation": "economy"
  };
  
  let seed = "business";
  for (const [key, value] of Object.entries(keywordMap)) {
    if (h.includes(key)) {
      seed = value;
      break;
    }
  }
  
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

// Helper for formatting time
function formatTimeSince(dateStr) {
  if (!dateStr) return "2 hours ago"; 
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours === 1) return "1 hr ago";
    if (hours > 24) return Math.floor(hours/24) + " days ago";
    return `${hours} hrs ago`;
  } catch (e) {
    return "2 hrs ago";
  }
}

// --- ROW 6: Market Ticker Strip ---
function MarketTicker() {
  return (
    <div className="w-full bg-[#1C1C1C] text-white py-1.5 px-4 flex flex-col md:flex-row items-center justify-start gap-8 text-[12px] border-b border-black">
      <div className="flex items-center gap-2">
        <span className="font-bold text-gray-300">SENSEX</span>
        <span className="font-medium text-white">73,583.22</span>
        <span className="text-[#CC0000] font-bold">▼ -1690.23</span>
      </div>
      <div className="hidden md:block w-px h-3.5 bg-gray-500"></div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-gray-300">NIFTY 50</span>
        <span className="font-medium text-white">22,819.6</span>
        <span className="text-[#CC0000] font-bold">▼ -486.86</span>
      </div>
      <div className="hidden md:block w-px h-3.5 bg-gray-500"></div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-gray-300">GOLD (MCX)</span>
        <span className="font-medium text-white">1,44,500.0</span>
        <span className="text-[#008000] font-bold">▲ +5007.00</span>
      </div>
    </div>
  );
}

// --- Floating CTA Button ---
function FloatingCTA() {
  return (
    <Link 
      href="/my-et"
      className="fixed bottom-8 right-8 z-[90] bg-[#C0001D] hover:bg-red-800 text-white shadow-xl hover:shadow-2xl px-6 py-4 rounded-sm font-black tracking-widest uppercase text-[11px] flex items-center justify-center gap-2 group transition-all duration-300"
    >
      <span>Enter Your Newsroom</span>
      <span className="group-hover:translate-x-1 transition-transform">→</span>
    </Link>
  );
}

// --- MAIN PAGE COMPONENT ---
export default async function Home() {
  const articles = await getArticles();
  
  // Categorization
  let topStories = articles.filter(a => a.category === "Top Stories");
  let markets = articles.filter(a => a.category === "Markets");

  // Fallbacks if data is too small to build a layout
  if (topStories.length < 15) {
    topStories = [...topStories, ...articles.filter(a => a.category !== "Top Stories")].slice(0, 15);
  }
  if (markets.length < 15) {
    markets = [...markets, ...articles.filter(a => a.category !== "Markets")].slice(0, 15);
  }

  // Helper arrays for Economy & Policy Banner (Section C)
  const economyAndPolicy = articles.filter(a => a.category === "Economy" || a.category === "Policy" || a.category === "Markets");

  // ============================
  // Grid Data (Upper Layout)
  // ============================
  const leftFeatured = topStories[0];
  const leftSideList = topStories.slice(1, 5);
  const leftMarketsBadge = markets.slice(0, 3);
  const midPrimeOptions = topStories.slice(5, 7);
  const midIdeasOptions = markets.slice(3, 6);
  const rightVideos = articles.slice(0, 4); 
  const rightOpinion = markets[6] || markets[0];

  // ============================
  // Scrolling Sections Data (Lower Layout)
  // ============================
  const sectionATopStories = topStories.slice(7, 11);
  const sectionBMarkets = markets.slice(7, 11);
  
  const sectionCEconomy = economyAndPolicy.slice(0, 4);
  if (sectionCEconomy.length < 4) sectionCEconomy.push(...articles.slice(0, 4 - sectionCEconomy.length));
  const sectionCMain = sectionCEconomy[0];
  const sectionCStack = sectionCEconomy.slice(1, 4);

  const sectionDLatest = articles.slice(15, 25);
  if (sectionDLatest.length === 0) sectionDLatest.push(...articles.slice(0, 10));

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#000000] relative selection:bg-red-200 selection:text-[#C0001D] font-sans">
      <MarketTicker />
      
      {/* ======================================= */}
      {/* UPPER 3-COLUMN GRID                     */}
      {/* ======================================= */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-5">
        <div className="flex flex-col lg:flex-row">
          
          {/* LEFT COLUMN: 40% */}
          <div className="lg:w-[40%] flex flex-col pr-0 lg:pr-5">
            {/* Featured Article */}
            <Link href={`/article/${leftFeatured?.id}`} className="group block mb-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-[50%] aspect-square sm:aspect-auto sm:h-[180px] bg-gray-100 border border-[#E0E0E0] relative flex-shrink-0 overflow-hidden">
                   <img 
                      src={getImageUrl(leftFeatured?.headline, 400, 250)} 
                      alt={leftFeatured?.headline || "Featured News"} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-[28px] font-serif font-bold text-[#1A1A1A] leading-tight group-hover:text-[#C0001D] transition-colors tracking-tight">
                    {leftFeatured?.headline}
                  </h1>
                  <span className="text-[11px] text-[#666666] mt-2 block font-sans">
                    {formatTimeSince(leftFeatured?.timestamp)}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-[#1A1A1A] text-[13.5px] leading-relaxed font-sans">
                {cleanExcerpt(leftFeatured?.body)}
              </p>
            </Link>

            {/* Sub-Articles Vertical List */}
            <div className="flex flex-col pt-1 border-t border-[#E0E0E0]">
              {leftSideList.map((article, idx) => (
                <Link key={idx} href={`/article/${article?.id}`} className="group py-2.5 border-b border-[#E0E0E0]">
                  <h2 className="text-[16px] font-serif font-semibold text-[#1A1A1A] group-hover:text-[#C0001D] transition-colors leading-[1.35]">
                    {article?.headline}
                  </h2>
                  <span className="text-[11px] text-[#666666] mt-1.5 block font-sans">
                    {formatTimeSince(article?.timestamp)}
                  </span>
                </Link>
              ))}
            </div>

            {/* ET MARKETS Orange Badge Section */}
            <div className="mt-6 border border-[#E0E0E0] bg-[#FFFFFF]">
              <div className="bg-[#FF6600] text-white text-[13px] font-bold px-3 py-1.5 inline-block uppercase tracking-wide">
                ET MARKETS
              </div>
              <div className="p-4 flex flex-col gap-4">
                {leftMarketsBadge.map((article, idx) => (
                  <Link key={idx} href={`/article/${article?.id}`} className="group flex flex-col gap-1 border-b border-[#E0E0E0] pb-3 last:border-b-0 last:pb-0">
                    <h3 className="text-[15px] font-serif font-semibold text-[#1A1A1A] group-hover:text-[#C0001D] leading-[1.3]">
                      {article?.headline}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN: 35% */}
          <div className="lg:w-[35%] flex flex-col px-0 lg:px-5 lg:border-l lg:border-r border-[#E0E0E0] mt-8 lg:mt-0">
            <div className="border border-[#E0E0E0] bg-[#FFFFFF] p-3 mb-5 border-t-[3px] border-t-red-600/20">
              <h2 className="text-[17px] font-serif font-black text-[#1A1A1A] italic">
                ET<span className="text-[#C0001D]">Prime</span> <span className="text-[13px] font-sans font-bold not-italic">Invest Smarter. Lead Stronger.</span>
              </h2>
            </div>

            <h3 className="text-[13px] font-bold uppercase text-[#C0001D] flex items-center gap-1 mb-3">
              Prime Exclusives <span className="text-lg leading-none">›</span>
            </h3>
            <div className="flex flex-col gap-4 mb-8">
              {midPrimeOptions.map((article, idx) => (
                <Link key={idx} href={`/article/${article?.id}`} className="group flex gap-3 pb-4 border-b border-[#E0E0E0]">
                  <div className="w-[85px] h-[65px] bg-gray-100 flex-shrink-0 border border-[#E0E0E0] overflow-hidden">
                    <img 
                      src={getImageUrl(article?.headline, 120, 80)} 
                      alt={article?.headline || "News"} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-serif font-semibold text-[15px] leading-snug text-[#1A1A1A] group-hover:text-[#C0001D]">
                      {article?.headline}
                    </h4>
                    <span className="text-[11px] text-[#666666] mt-2 block font-sans">
                      {formatTimeSince(article?.timestamp)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <h3 className="text-[13px] font-bold uppercase text-[#1A1A1A] flex items-center gap-1 mb-3 hover:text-[#C0001D]">
              <Link href="#">Investment Ideas <span className="text-lg leading-none text-[#C0001D]">›</span></Link>
            </h3>
            <div className="flex flex-col gap-4">
              {midIdeasOptions.map((article, idx) => (
                <Link key={idx} href={`/article/${article?.id}`} className="group flex gap-3 pb-4 border-b border-[#E0E0E0] last:border-b-0">
                  <div className="w-[85px] h-[65px] bg-gray-100 flex-shrink-0 border border-[#E0E0E0] overflow-hidden">
                    <img 
                      src={getImageUrl(article?.headline, 120, 80)} 
                      alt={article?.headline || "News"} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-serif font-semibold text-[15px] leading-snug text-[#1A1A1A] group-hover:text-[#C0001D]">
                      {article?.headline}
                    </h4>
                    <span className="text-[11px] text-[#666666] mt-2 block font-sans">
                      {formatTimeSince(article?.timestamp)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: 25% */}
          <div className="lg:w-[25%] flex flex-col pl-0 lg:pl-5 mt-8 lg:mt-0">
            <h3 className="text-[13px] font-bold uppercase text-[#1A1A1A] flex items-center gap-1 mb-3">
              Videos <span className="text-lg leading-none text-[#C0001D]">›</span>
            </h3>
            <div className="flex flex-col gap-3 mb-8">
              {rightVideos.map((article, idx) => (
                <Link key={idx} href={`/article/${article?.id}`} className="group flex gap-2 pb-3 border-b border-[#E0E0E0]">
                  <span className="text-[#C0001D] text-lg leading-none pt-0.5">▶</span>
                  <h4 className="font-sans font-bold text-[13px] leading-[1.3] text-[#1A1A1A] group-hover:text-[#C0001D] group-hover:underline">
                    {article?.headline}
                  </h4>
                </Link>
              ))}
            </div>

            <h3 className="text-[13px] font-bold uppercase text-[#1A1A1A] flex items-center gap-1 mb-3">
              Opinion <span className="text-lg leading-none text-[#C0001D]">›</span>
            </h3>
            <div className="flex flex-col">
              <Link href={`/article/${rightOpinion?.id}`} className="group block">
                <div className="w-full aspect-video bg-gray-100 border border-[#E0E0E0] mb-3 overflow-hidden">
                  <img 
                      src={getImageUrl(rightOpinion?.headline, 400, 150)} 
                      alt={rightOpinion?.headline || "Opinion"} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <h4 className="text-[17px] font-serif font-bold text-[#1A1A1A] group-hover:text-[#C0001D] leading-snug">
                  {rightOpinion?.headline}
                </h4>
                <p className="mt-2 text-[#1A1A1A] text-[13px] font-sans leading-relaxed">
                   {cleanExcerpt(rightOpinion?.body)}
                </p>
                <span className="text-[11px] text-[#666666] mt-2 block font-sans">
                  {formatTimeSince(rightOpinion?.timestamp)}
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ======================================= */}
      {/* LOWER SCROLLING CONTENT                 */}
      {/* ======================================= */}

      {/* SECTION A: "TOP STORIES" FULL ROW */}
      <div className="w-full border-t-[4px] border-[#E0E0E0] mt-4">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8">
            <h2 className="text-[18px] font-black uppercase text-[#C0001D] mb-6 flex items-center">
               Top Stories <span className="text-[24px] leading-none ml-1 mt-0.5">›</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {sectionATopStories.map((article, idx) => (
                    <Link key={idx} href={`/article/${article?.id}`} className="group flex flex-col pt-0 pb-4 md:border-r border-[#E0E0E0] last:border-r-0 lg:pr-8 last:pr-0">
                        <div className="w-full h-[180px] bg-gray-100 overflow-hidden mb-3 border border-[#E0E0E0]">
                            <img 
                                src={getImageUrl(article?.headline, 300, 180)} 
                                alt={article?.headline || "News"} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                        </div>
                        <h3 className="font-serif font-bold text-[17px] text-[#1A1A1A] group-hover:text-[#C0001D] leading-[1.3] mb-2">
                           {article?.headline}
                        </h3>
                        <span className="text-[11px] text-[#666666] mt-auto font-sans">
                           {formatTimeSince(article?.timestamp)}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
      </div>

      {/* SECTION B: "MARKETS NEWS" FULL ROW */}
      <div className="w-full border-t border-[rgba(204,0,0,0.15)] bg-slate-50/30">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8">
            <h2 className="text-[18px] font-black uppercase text-[#C0001D] mb-6 flex items-center">
               Markets News <span className="text-[24px] leading-none ml-1 mt-0.5">›</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {sectionBMarkets.map((article, idx) => (
                    <Link key={idx} href={`/article/${article?.id}`} className="group flex flex-col pt-0 pb-4 md:border-r border-[#E0E0E0] last:border-r-0 lg:pr-8 last:pr-0">
                        <div className="w-full h-[180px] bg-gray-100 overflow-hidden mb-3 border border-[#E0E0E0]">
                            <img 
                                src={getImageUrl(article?.headline, 300, 180)} 
                                alt={article?.headline || "News"} 
                                onError={(e) => { e.currentTarget.src = "https://picsum.photos/400/250"; }}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                        </div>
                        <h3 className="font-serif font-bold text-[17px] text-[#1A1A1A] group-hover:text-[#C0001D] leading-[1.3] mb-2">
                           {article?.headline}
                        </h3>
                        <span className="text-[11px] text-[#666666] mt-auto font-sans">
                           {formatTimeSince(article?.timestamp)}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
      </div>

      {/* SECTION C: "ECONOMY & POLICY" BANNER ROW */}
      <div className="w-full bg-[#1A1A1A] pt-12 pb-16 mt-0">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
             <h2 className="text-[18px] font-bold uppercase text-white mb-8 flex items-center">
               Economy & Policy <span className="text-xl leading-none ml-1 text-[#C0001D]">›</span>
             </h2>
             <div className="flex flex-col lg:flex-row gap-0 lg:gap-12">
                 
                 {/* Left 40% */}
                 <Link href={`/article/${sectionCMain?.id}`} className="lg:w-[45%] group flex flex-col mb-10 lg:mb-0">
                     <div className="w-full aspect-video lg:h-[280px] bg-gray-800 overflow-hidden mb-5">
                         <img 
                            src={getImageUrl(sectionCMain?.headline, 500, 300)} 
                            alt={sectionCMain?.headline || "Economy & Policy"} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                     </div>
                     <h3 className="font-serif font-bold text-[28px] text-white group-hover:text-[#C0001D] transition-colors leading-[1.2] mb-3">
                         {sectionCMain?.headline}
                     </h3>
                     <p className="text-[#A0A0A0] text-[14px] font-sans leading-relaxed">
                         {cleanExcerpt(sectionCMain?.body)}
                     </p>
                     <span className="text-[11px] text-[#666666] mt-4 font-sans">
                         {formatTimeSince(sectionCMain?.timestamp)}
                     </span>
                 </Link>

                 {/* Right 60% */}
                 <div className="lg:w-[55%] flex flex-col justify-center">
                     {sectionCStack.map((article, idx) => (
                         <Link key={idx} href={`/article/${article?.id}`} className="group flex flex-col sm:flex-row gap-6 py-6 border-b border-gray-800 last:border-b-0 first:pt-0">
                             <div className="w-full sm:w-[160px] h-[110px] flex-shrink-0 bg-gray-800 overflow-hidden">
                                 <img 
                                    src={getImageUrl(article?.headline, 160, 110)} 
                                    alt={article?.headline || "Economy News"} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                  />
                             </div>
                             <div className="flex flex-col justify-center">
                                 <h3 className="font-serif font-bold text-[20px] text-white group-hover:text-[#C0001D] transition-colors leading-[1.3] mb-2.5">
                                     {article?.headline}
                                 </h3>
                                 <span className="text-[11px] text-gray-500 font-sans">
                                     {formatTimeSince(article?.timestamp)}
                                 </span>
                             </div>
                         </Link>
                     ))}
                 </div>

             </div>
          </div>
      </div>

      {/* SECTION D: "LATEST NEWS" TICKER LIST */}
      <div className="w-full bg-[#FFFFFF]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-16">
            <h2 className="text-[16px] font-black uppercase tracking-widest text-[#1A1A1A] mb-6 border-b-[3px] border-[#1A1A1A] pb-2 inline-block">
               Latest News
            </h2>
            <div className="flex flex-col border border-[#E0E0E0] rounded-sm overflow-hidden">
                {sectionDLatest.map((article, idx) => (
                    <Link 
                        key={idx} 
                        href={`/article/${article?.id}`} 
                        className={`group px-5 py-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-5 hover:bg-red-50/40 transition-colors border-b border-[#E0E0E0] last:border-b-0 ${idx % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#FAFAFA]'}`}
                    >
                        <div className="flex items-center gap-3 md:w-[160px] flex-shrink-0">
                            <span className="text-[#C0001D] text-xl font-black leading-none group-hover:translate-x-1 transition-transform mb-0.5">›</span>
                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{article?.category || 'News'}</span>
                        </div>
                        <h3 className="font-serif font-bold text-[17px] text-[#1A1A1A] group-hover:text-[#C0001D] leading-tight flex-grow">
                            {article?.headline}
                        </h3>
                        <span className="text-[11px] text-[#666666] font-sans md:text-right flex-shrink-0 md:w-[120px]">
                            {formatTimeSince(article?.timestamp)}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
      </div>

      {/* SECTION E: FOOTER */}
      <footer className="w-full bg-[#1A1A1A] text-white py-16">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col gap-10">
              {/* Top Row */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-800 pb-10">
                  <Link href="/" className="flex items-center gap-3">
                     <div className="bg-[#C0001D] text-white font-serif font-bold text-[28px] w-12 h-12 flex items-center justify-center leading-none tracking-tighter">
                        ET
                     </div>
                     <span className="text-[26px] font-serif font-bold text-white tracking-tight">
                        THE ECONOMIC TIMES
                     </span>
                  </Link>
                  
                  <div className="flex items-center flex-wrap gap-8 text-[12px] font-bold text-gray-400 uppercase tracking-widest">
                      <a href="#" className="hover:text-white transition-colors">About Us</a>
                      <a href="#" className="hover:text-white transition-colors">Contact</a>
                      <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                      <a href="#" className="hover:text-white transition-colors">Terms</a>
                  </div>
              </div>

              {/* Bottom Row */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-sans text-gray-500">
                  <div className="flex items-center gap-4">
                     <a href="#" className="hover:text-white">Facebook</a>
                     <a href="#" className="hover:text-white">Twitter</a>
                     <a href="#" className="hover:text-white">LinkedIn</a>
                  </div>
                  <div>
                      © 2026 The Economic Times. All rights reserved.
                  </div>
              </div>
          </div>
      </footer>

      {/* FLOATING FAB */}
      <FloatingCTA />
      
    </main>
  );
}
