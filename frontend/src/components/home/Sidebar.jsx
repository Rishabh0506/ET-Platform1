export default function Sidebar() {
  const trending = [
    { title: "Nifty hits record high as FIIs pour in $2B", category: "Markets" },
    { title: "Zomato share price clarifies after Blinkit rumor", category: "Companies" },
    { title: "Why Apple's focus on Indian manufacturing is a hedge against China", category: "Tech" },
    { title: "Govt to introduce new Digital India Act in next session", category: "Policy" }
  ];

  return (
    <aside className="flex flex-col gap-10">
      {/* Trending Now */}
      <section>
        <h2 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-6 border-b-2 border-red-900 pb-2">
          Trending on ET AI
        </h2>
        <div className="flex flex-col gap-6">
          {trending.map((item, i) => (
            <div key={i} className="flex gap-4 group cursor-pointer">
              <span className="text-2xl font-serif font-black text-gray-200 group-hover:text-red-900/10 transition-colors">
                {i + 1}
              </span>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-red-700 uppercase mb-1">{item.category}</span>
                <p className="text-sm font-bold text-gray-900 leading-snug group-hover:underline">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Market Insight */}
      <section className="bg-red-900 text-white p-6 rounded-sm shadow-xl shadow-red-900/20">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
          <h2 className="text-xs font-black uppercase tracking-widest text-red-100">AI Market Sentiment</h2>
        </div>
        <p className="text-lg font-serif italic mb-4 leading-relaxed">
          "The current market volatility indices suggest a <span className="text-accent underline">Bullish Consolidation</span> phase for IT stocks."
        </p>
        <button className="text-[10px] font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 px-4 py-2 transition-colors border border-white/20">
          View Detail Analysis
        </button>
      </section>

      {/* Watchlist Quick View */}
      <section className="bg-gray-50 border border-gray-100 p-5 rounded-sm">
        <h2 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-4">Your Watchlist</h2>
        <div className="flex flex-col gap-3">
          {[
            { name: "RELIANCE", price: "2,945.00", change: "+1.2%" },
            { name: "TCS", price: "3,812.20", change: "-0.4%" },
            { name: "HDFC BANK", price: "1,452.10", change: "+0.8%" }
          ].map((stock) => (
            <div key={stock.name} className="flex items-center justify-between text-xs py-2 border-b border-gray-100 last:border-0">
              <span className="font-bold text-gray-700">{stock.name}</span>
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-900">{stock.price}</span>
                <span className={stock.change.startsWith("+") ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                  {stock.change}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-colors">
          Manage Watchlist
        </button>
      </section>
    </aside>
  );
}
