import { getArticles } from "@/lib/api/articles";
import Link from "next/link";

function formatTimelineDate(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = months[d.getMonth()];
    const day = d.getDate();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return `${month} ${day}  ${hours}:${minutes} ${ampm}`;
  } catch (e) {
    return "";
  }
}

export default async function DashboardSidebar() {
  const watchlist = [
    { name: "RELIANCE", val: "2,984.00", chg: "+1.2%", up: true },
    { name: "BAJAJFIN", val: "6,412.00", chg: "-2.1%", up: false },
    { name: "ZOMATO", val: "184.20", chg: "+4.1%", up: true },
    { name: "TCS", val: "3,812.50", chg: "-0.4%", up: false },
  ];

  let timelineArticles = [];
  let error = false;
  try {
    const res = await getArticles();
    if (res && Array.isArray(res)) {
      timelineArticles = res;
    } else {
      error = true;
    }
  } catch (err) {
    error = true;
  }

  return (
    <div className="flex flex-col gap-12 sticky top-12">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F0F0F0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #C0001D;
          border-radius: 2px;
        }
      `}</style>

      {/* 1. Latest News Timeline (Gizmodo / Verge Style) */}
      <section className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-[4px] h-[600px] overflow-y-auto w-full custom-scrollbar relative flex flex-col">
        {/* Header */}
        <div className="p-4 border-b-2 border-[#E0E0E0] sticky top-0 bg-[#FAFAFA] z-10 flex-shrink-0">
          <h2 className="text-[28px] md:text-[32px] font-serif font-bold text-[#1A1A1A] leading-none tracking-tight">
            • Latest
          </h2>
        </div>

        {/* Timeline Items */}
        <div className="flex flex-col flex-1">
          {error ? (
            <div className="flex items-center justify-center p-8 text-[#888888] text-sm h-full font-sans">
               Unable to load timeline
            </div>
          ) : timelineArticles.length > 0 ? (
            timelineArticles.map((article, idx) => (
              <div key={idx} className="p-[12px_16px] border-b border-[#F0F0F0] last:border-b-0">
                <div className="text-[11px] font-bold uppercase text-[#888888] mb-1 font-sans">
                  {formatTimelineDate(article.timestamp)}
                </div>
                <Link href={`/article/${article.id}`} className="block group/link">
                  <h3 className="font-serif font-semibold text-[14px] md:text-[15px] text-[#1A1A1A] leading-snug line-clamp-2 transition-colors relative pl-3.5 group-hover/link:text-[#C0001D]">
                    <span className="absolute left-0 top-[2px] text-[#1A1A1A] group-hover/link:text-[#C0001D] text-[16px] leading-none">•</span>
                    {article.headline}
                  </h3>
                </Link>
                <div className="text-[11px] font-normal uppercase text-[#888888] mt-1 pl-3.5 font-sans">
                  {article.category || "News"}
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center p-8 text-[#888888] text-sm h-full font-sans">
               No articles available
            </div>
          )}
        </div>
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
