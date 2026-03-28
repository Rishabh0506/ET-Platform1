export default function LiveImpactStrip() {
  const tickerItems = [
    { text: "OIL PRICES ⇡ 4% | FMCG MARGINS UNDER PRESSURE", type: "warning" },
    { text: "AI BILL PASSED | TECH RALLY EXPECTED", type: "success" },
    { text: "NIFTY PRE-OPEN: 22,510 (+0.3%) | BULLISH", type: "info" },
    { text: "RBI HOLDS RATES | NEUTRAL IMPACT", type: "info" },
    { text: "BAJAJ FINANCE HITS 52-WEEK LOW | BUY?", type: "warning" },
  ];

  const displayItems = [...tickerItems, ...tickerItems];

  return (
    <div className="w-full bg-red-800 text-white h-12 flex items-center overflow-hidden border-b-2 border-red-900 shadow-2xl relative z-50">
      {/* Segmented Branding Label */}
      <div className="absolute left-0 top-0 bottom-0 bg-slate-950 px-8 flex items-center gap-4 z-20 shadow-[15px_0_30px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-2">
           <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
           <span className="text-[11px] font-black uppercase tracking-[0.4em] whitespace-nowrap">Live Portfolio Impact</span>
        </div>
        <div className="h-4 w-px bg-slate-800"></div>
        <div className="text-[9px] font-black text-red-500 uppercase tracking-widest italic animate-soft-pulse">Active Monitor</div>
      </div>

      {/* Ticker Container - Segmented feel */}
      <div className="flex items-center whitespace-nowrap animate-marquee py-2 pl-[320px]">
        {displayItems.map((item, i) => (
          <div key={i} className="flex items-center mx-12">
            <div className={`px-4 py-1.5 rounded-sm text-[11px] font-black tracking-widest ${item.type === 'warning' ? 'bg-red-900/50' : item.type === 'success' ? 'bg-green-900/50' : 'bg-slate-900/50'} border border-white/5`}>
              {item.text}
            </div>
            {i % 2 === 0 && <span className="ml-12 text-white/20 select-none text-xs">◆</span>}
          </div>
        ))}
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-red-800 to-transparent pointer-events-none z-10"></div>
    </div>
  );
}
