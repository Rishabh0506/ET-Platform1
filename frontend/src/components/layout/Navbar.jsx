import Link from "next/link";

export default function Navbar() {
  const trendingTopics = ["Live", "Budget 2026", "AI Policy", "Crypto Hub", "Tech War", "IPO Monitor"];

  return (
    <nav className="w-full bg-white font-sans flex flex-col border-b border-[#E0E0E0]">
      {/* ROW 1: TOP UTILITY BAR */}
      <div className="w-full bg-white border-b border-[#E0E0E0] px-6 py-2 flex items-center justify-between text-[11px] text-[#666666]">
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-[#C0001D] transition-colors">My Watchlist</a>
          <span className="text-[#E0E0E0]">|</span>
          <a href="#" className="hover:text-[#C0001D] transition-colors">Subscribe</a>
          <span className="text-[#E0E0E0]">|</span>
          <a href="#" className="hover:text-[#C0001D] transition-colors">Sign In</a>
        </div>
        <div></div> {/* Right side empty as per instructions */}
      </div>

      {/* ROW 2: LOGO BAR */}
      <div className="w-full bg-white px-6 py-5 relative flex flex-col items-center justify-center border-b border-[#E0E0E0]">
        <Link href="/" className="flex flex-col items-center group mb-2.5">
          <div className="flex items-center gap-3">
            <div className="bg-[#C0001D] text-white font-serif font-bold text-3xl w-14 h-14 flex items-center justify-center leading-none tracking-tighter">
              ET
            </div>
            <span className="text-[36px] md:text-[42px] font-serif font-bold text-[#1A1A1A] tracking-tight group-hover:text-[#C0001D] transition-colors pt-1">
              THE ECONOMIC TIMES
            </span>
          </div>
        </Link>
        <div className="text-[12px] text-[#666666] flex flex-wrap items-center justify-center gap-2">
          <span>English Edition</span>
          <span className="text-[#E0E0E0]">|</span>
          <span>29 March, 2026</span>
          <span className="text-[#E0E0E0]">|</span>
          <a href="#" className="hover:text-[#C0001D] hover:underline">Today's ePaper</a>
        </div>

        {/* Right side Utility buttons in Logo Bar (Desktop only) */}
        <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-end gap-2 text-[13px]">
           <a href="#" className="text-[#1A1A1A] hover:text-[#C0001D] font-bold">Sign In</a>
           <a href="#" className="bg-[#C0001D] text-white px-5 py-2 hover:bg-red-800 transition-colors uppercase tracking-widest text-[11px] font-bold rounded-sm">Subscribe</a>
        </div>
      </div>

      {/* ROW 3: MAIN NAV BAR */}
      <div className="w-full bg-white border-b border-[#E0E0E0] px-6 py-0 flex justify-center">
        <ul className="flex items-center flex-wrap justify-center gap-6 md:gap-8 text-[12px] font-bold text-[#1A1A1A] uppercase tracking-[0.5px]">
          <li><Link href="/" className="text-[#C0001D] border-b-[3px] border-[#C0001D] pt-3 pb-2.5 inline-block">Home</Link></li>
          <li><a href="#" className="hover:text-[#C0001D] transition-all pt-3 pb-2.5 inline-block">Intelligence</a></li>
          <li><a href="#" className="hover:text-[#C0001D] transition-all pt-3 pb-2.5 inline-block">Markets</a></li>
          <li><a href="#" className="hover:text-[#C0001D] transition-all pt-3 pb-2.5 inline-block">Tech</a></li>
          <li><a href="#" className="hover:text-[#C0001D] transition-all pt-3 pb-2.5 inline-block">Policy</a></li>
          <li><a href="#" className="hover:text-[#C0001D] transition-all pt-3 pb-2.5 inline-block">Alpha</a></li>
        </ul>
      </div>

      {/* ROW 4: SECONDARY NAV BAR */}
      <div className="w-full bg-[#FEF1F1] px-6 py-2.5 flex justify-center border-b border-[#E0E0E0]">
        <ul className="flex items-center flex-wrap justify-center gap-7 text-[12px] text-[#1A1A1A]">
          <li><a href="#" className="hover:text-[#C0001D] transition-colors flex items-center gap-1.5 font-bold text-[#C0001D]">
            <span className="w-2 h-2 bg-[#C0001D] rounded-full animate-pulse"></span> News Live!
          </a></li>
          <li><a href="#" className="hover:text-[#C0001D] transition-colors">Assembly Elections</a></li>
          <li><a href="#" className="hover:text-[#C0001D] transition-colors">IPL 2026</a></li>
          <li><a href="#" className="hover:text-[#C0001D] transition-colors">Economy Dashboard</a></li>
          <li><a href="#" className="hover:text-[#C0001D] transition-colors">Wealth Edition</a></li>
        </ul>
      </div>

      {/* ROW 5: STATIC TICKER */}
      <div className="w-full bg-[#1A1A1A] px-6 py-2 border-b border-black">
        <div className="max-w-[1240px] mx-auto flex items-center justify-center gap-6 md:gap-12 flex-wrap text-white text-[12px] py-1.5">
          <span className="font-bold text-[#FFFFFF] uppercase tracking-widest pr-4 md:pr-6 border-r border-[#FFFFFF]/30">Trending</span>
          {trendingTopics.map((topic) => (
            <a 
              key={topic} 
              href="#" 
              className="text-white hover:text-gray-300 transition-colors uppercase tracking-[0.5px]"
            >
              {topic.replace(/\s/g, '_')}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
