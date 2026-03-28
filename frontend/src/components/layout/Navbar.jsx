export default function Navbar() {
  const trendingTopics = ["Live", "Budget 2026", "AI Policy", "Crypto Hub", "Tech War", "IPO Monitor"];

  return (
    <nav className="w-full bg-white border-b border-slate-100 sticky top-0 z-[100]">
      {/* 1. Elite Utility Layer */}
      <div className="bg-slate-50 border-b border-slate-100 px-8 py-2.5 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
        <div className="flex items-center gap-8">
          <a href="#" className="hover:text-red-900 transition-colors">Markets Explorer</a>
          <a href="#" className="hover:text-red-900 transition-colors">Global Watchlist</a>
          <a href="#" className="hover:text-red-900 transition-colors">Portfolio Command</a>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 border-r border-slate-200 pr-8">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-slate-900">NIFTY 50: 22,510.45 (+0.3%)</span>
          </div>
          <a href="/onboarding" className="hover:text-red-900 transition-all font-black">Login / Adapt Profile</a>
        </div>
      </div>

      {/* 2. Main High-Density Branding Layer */}
      <div className="px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-16">
          {/* Logo Section */}
          <a href="/" className="flex flex-col leading-none group">
            <span className="text-3xl font-serif font-black tracking-tighter text-slate-950 flex items-center gap-1">
              ET <span className="text-red-800 italic underline decoration-red-800/10 decoration-4 underline-offset-4 group-hover:text-red-900 transition-colors">AI</span>
            </span>
            <span className="text-[9px] font-black tracking-[0.4em] text-slate-400 mt-2 uppercase italic transition-all group-hover:text-slate-600">Intelligence Layer</span>
          </a>

          <ul className="hidden lg:flex items-center gap-10 text-[11px] font-black text-slate-900 uppercase tracking-widest mt-1">
            <li><a href="/" className="hover:text-red-800 transition-all border-b border-transparent hover:border-red-800">Intelligence</a></li>
            <li><a href="#" className="hover:text-red-800 transition-all border-b border-transparent hover:border-red-800">Markets</a></li>
            <li><a href="#" className="hover:text-red-800 transition-all border-b border-transparent hover:border-red-800">Tech</a></li>
            <li><a href="#" className="hover:text-red-800 transition-all border-b border-transparent hover:border-red-800">Policy</a></li>
            <li><a href="#" className="hover:text-red-800 transition-all border-b border-transparent hover:border-red-800">Alpha</a></li>
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <button className="p-2 text-slate-400 hover:text-red-900 transition-colors transform hover:scale-110">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
          <a 
            href="/my-et" 
            className="bg-red-800 text-white px-8 py-3 rounded-sm text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-950 transition-all active:scale-95 shadow-2xl shadow-red-900/20"
          >
            My Command Center
          </a>
        </div>
      </div>

      {/* 3. Real-time Trending Strip */}
      <div className="px-8 py-2.5 bg-slate-950 overflow-hidden relative">
        <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
          <span className="text-[9px] font-black text-red-500 uppercase tracking-[0.4em] italic pr-8 border-r border-white/10">Trending Intelligence</span>
          {trendingTopics.map((topic) => (
            <a 
              key={topic} 
              href="#" 
              className="text-[10px] font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-[0.1em]"
            >
              #{topic.replace(/\s/g, '_')}
            </a>
          ))}
          {/* Duplicate for seamless marquee */}
          {trendingTopics.map((topic) => (
            <a 
              key={`${topic}-2`} 
              href="#" 
              className="text-[10px] font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-[0.1em]"
            >
              #{topic.replace(/\s/g, '_')}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
