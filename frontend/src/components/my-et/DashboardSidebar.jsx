export default function DashboardSidebar() {
  const insights = [
    { id: "01", title: "Portfolio Exposure Detected", body: "Your small-cap tech allocation is hitting risk thresholds. Policy shift expected Tues.", type: "alert" },
    { id: "02", title: "Dividend Alert: HUL", body: "Record date approaching. Expected yield: 2.1%. Action recommended.", type: "info" },
    { id: "03", title: "Sector Rotation Signal", body: "Liquidity Moving from Banking to Energy. Hedge utilities now.", type: "system" }
  ];

  const watchlist = [
    { name: "RELIANCE", val: "2,984.00", chg: "+1.2%", up: true },
    { name: "BAJAJFIN", val: "6,412.00", chg: "-2.1%", up: false },
    { name: "ZOMATO", val: "184.20", chg: "+4.1%", up: true },
    { name: "TCS", val: "3,812.50", chg: "-0.4%", up: false },
  ];

  return (
    <div className="flex flex-col gap-12 sticky top-12">
      
      {/* 1. AI Intelligence Command Center (Supreme Gradient & Glow) */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white p-12 rounded-sm border-t-[6px] border-red-800 shadow-3xl shadow-slate-950/60 relative overflow-hidden group">
        {/* Vertical Pulse Accent Line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-red-900/30">
           <div className="w-full h-32 bg-red-500 animate-[pulse_4s_infinite] shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
        </div>
        
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-15 transition-all duration-1000 rotate-12 group-hover:rotate-0">
           <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
        </div>

        <div className="flex items-center justify-between mb-16 relative z-10">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-red-500 flex items-center gap-4">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse glow-red"></span>
              AI Command Module
            </h2>
            <div className="px-3 py-1 bg-red-900/30 border border-red-800/50 text-[8px] font-black text-red-500 rounded-sm uppercase tracking-[0.2em] shadow-lg">SYSTEM ACTIVE</div>
        </div>

        <div className="space-y-12 mb-16 relative z-10">
          {insights.map((ins) => (
            <div key={ins.id} className="group/item cursor-pointer transform hover:translate-x-2 transition-transform duration-500">
              <div className="flex gap-6">
                <span className="text-3xl font-serif font-black text-white/5 italic group-hover/item:text-red-900/40 transition-colors leading-none">{ins.id}</span>
                <div className="flex flex-col gap-3">
                  <h3 className={`text-[11px] font-black uppercase tracking-[0.3em] transition-colors ${ins.type === 'alert' ? 'text-red-500 group-hover/item:text-red-400' : 'text-slate-400 group-hover/item:text-white'}`}>
                    {ins.title}
                  </h3>
                  <p className="text-base font-serif italic text-slate-500 leading-relaxed group-hover/item:text-slate-100 transition-all duration-500">
                    "{ins.body}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Strategic Warning Panel */}
        <div className="bg-red-950/40 border-l-4 border-red-800 p-8 rounded-sm mb-12 shadow-2xl shadow-black relative overflow-hidden group/warning">
           <div className="absolute inset-0 bg-red-900/5 opacity-0 group-hover/warning:opacity-100 transition-opacity"></div>
           <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] block mb-3 italic">Critical Exposure Alert</span>
           <p className="text-sm text-red-100/80 font-medium leading-relaxed italic relative z-10">
             Banking Sector volatility cross-referenced with your liquidity targets requires <span className="text-white font-black underline decoration-red-600 decoration-2">Immediate Hedge Execution</span>.
           </p>
        </div>

        <button className="w-full bg-white text-slate-950 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-red-800 hover:text-white transition-all shadow-3xl active:scale-95 relative z-10">
          Execute System Intel
        </button>
      </section>

      {/* 2. Live Watchlist Module (Sleek Contrast) */}
      <section className="bg-white border border-slate-100 p-12 shadow-layered rounded-sm group">
        <div className="flex items-center justify-between mb-12 border-b-2 border-slate-950 pb-6 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 h-0.5 bg-red-900 w-12 group-hover:w-full transition-all duration-700"></div>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-950 italic">Sector Watchlist</h2>
          <span className="text-[10px] font-black text-red-800 uppercase tracking-widest animate-pulse italic">Live Core</span>
        </div>

        <div className="flex flex-col gap-8">
          {watchlist.map(stock => (
            <div key={stock.name} className="flex items-center justify-between group cursor-pointer hover:px-2 transition-all duration-300">
              <span className="text-sm font-black text-slate-950 tracking-tighter group-hover:text-red-800 transition-colors uppercase italic">{stock.name}</span>
              <div className="flex items-center gap-8">
                <span className="text-base font-mono font-bold text-slate-400 tracking-tighter group-hover:text-slate-900 transition-colors">{stock.val}</span>
                <span className={`text-[10px] font-black px-3 py-1 rounded-sm shadow-sm transition-all ${stock.up ? 'bg-green-50 text-green-700 glow-green' : 'bg-red-50 text-red-700'} italic`}>
                  {stock.chg}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-slate-100">
           <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-1 rounded-full bg-slate-950"></div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Personal Sentiment</span>
           </div>
           <p className="text-sm text-slate-500 font-serif italic leading-relaxed">
             "Dynamic patterns in {watchlist[2].name} suggest <span className="text-slate-950 font-bold border-b border-slate-200">Alpha Outperformance</span>. Maintain accumulation."
           </p>
        </div>
      </section>

    </div>
  );
}
