export default function HeroSection({ articles }) {
  const featured = articles[0] || {};
  const latest = articles.slice(1, 5);

  return (
    <div className="flex flex-col gap-12 mb-20">
      {/* 1. DOMINANT FEATURE STORY (Left Focus, Extreme Impact) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 group cursor-pointer">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-sm bg-slate-900 mb-10 shadow-3xl shadow-slate-900/20">
            <img 
              src={`https://picsum.photos/seed/${featured.id}/1200/600`} 
              alt={featured.headline}
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale-[0.2] group-hover:grayscale-0"
            />
            <div className="absolute top-6 left-6 bg-red-800 text-white text-[11px] font-black uppercase tracking-[0.3em] px-4 py-1.5 shadow-2xl">
              Dominant Brief
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-slate-950 to-transparent">
              <span className="text-red-400 text-xs font-black uppercase tracking-[0.3em] mb-4 block italic underline decoration-red-400/30">Intelligence Priority: HIGH</span>
              <h1 className="text-4xl lg:text-7xl font-serif font-black text-white leading-[0.95] tracking-tighter transition-all duration-500 group-hover:text-accent">
                {featured.headline}
              </h1>
            </div>
          </div>
          
          <div className="px-2">
            <p className="text-slate-600 text-2xl leading-relaxed italic font-serif max-w-3xl mb-8 group-hover:text-slate-900 transition-colors">
              "{featured.summary}"
            </p>
            <div className="flex items-center gap-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] italic border-t border-slate-100 pt-6">
              <span className="text-slate-900">ET AI BUREAU</span>
              <span>•</span>
              <span className="text-red-800 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-800 animate-pulse"></span>
                UPDATED 2 MINS AGO
              </span>
            </div>
          </div>
        </div>

        {/* 2. LATEST HEADLINES (Verge Style) */}
        <div className="lg:col-span-4 border-l-2 border-slate-950 pl-10">
          <div className="flex items-center justify-between mb-10 border-b border-slate-200 pb-4">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-950 italic flex items-center gap-3">
              Latest Live
            </h2>
            <a href="#" className="text-[10px] font-black text-red-800 uppercase hover:underline italic">All Headlines →</a>
          </div>
          
          <div className="flex flex-col gap-10">
            {latest.map((article, i) => (
              <div key={article.id} className="group cursor-pointer">
                <span className="text-[10px] font-black text-red-800 uppercase tracking-[0.3em] mb-3 block opacity-50 group-hover:opacity-100 transition-opacity italic">
                  {article.category || "Markets"}
                </span>
                <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-red-800 transition-all duration-300 tracking-tight">
                  {article.headline}
                </h3>
                <div className="mt-4 flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
                  <span>20m ago</span>
                  <span>/</span>
                  <span className="text-slate-900">Analysis →</span>
                </div>
                {i < latest.length - 1 && <div className="mt-10 border-b border-slate-100"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
