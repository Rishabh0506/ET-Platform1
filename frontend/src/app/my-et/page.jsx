import DailyBrief from "@/components/my-et/DailyBrief";
import VernacularFeed from "@/components/my-et/VernacularFeed";
import LiveImpactStrip from "@/components/my-et/LiveImpactStrip";
import DashboardSidebar from "@/components/my-et/DashboardSidebar";
import { getArticles } from "@/lib/api/articles";

export const metadata = {
  title: "Your Command Center | ET AI",
  description: "Elite financial intelligence dashboard adapted for you.",
};

export const dynamic = "force-dynamic";

export default async function MyET() {
  // Fetch live AI-expanded news
  const activeArticles = await getArticles();

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

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-16 relative z-10">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <span className="px-4 py-1.5 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-sm shadow-2xl shadow-slate-950/20 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Market Status: <span className="text-green-500">Bullish</span>
                </span>
                <span className="px-4 py-1.5 border border-slate-200 bg-white text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] rounded-sm">
                  Persona: <span className="text-slate-950 font-black italic font-serif">Investor</span>
                </span>
                <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Confidence:</span>
                   <span className="text-[9px] font-black text-red-800 uppercase tracking-widest italic animate-soft-pulse">High</span>
                </div>
              </div>
              
              <div className="relative inline-block mb-10">
                <span className="text-[10px] font-black text-red-800 uppercase tracking-[0.5em] mb-4 block opacity-60">AI GENERATED INSIGHT</span>
                <h1 className="text-6xl lg:text-8xl font-serif font-black text-slate-950 tracking-tighter leading-[0.85]">
                  Good Evening, <br />
                  <span className="text-red-900 underline-animate cursor-default">Argh.</span>
                </h1>
              </div>
              
              <p className="text-2xl lg:text-3xl text-slate-500 font-medium italic leading-relaxed max-w-2xl mt-4">
                "Markets are rewarding patience today. Your portfolio is up <span className="text-green-600 font-black border-b-2 border-green-600/20">1.2%</span>. <span className="text-slate-900 font-bold border-b border-slate-200">Energy exposure</span> detected."
              </p>
            </div>

            {/* 3. Floating Portfolio Snapshot Card (Glow Effect) */}
            <div className="lg:w-96 flex-shrink-0">
               <div className="bg-slate-950 p-10 shadow-3xl shadow-slate-950/60 transform hover:-translate-y-3 transition-all duration-700 border-t-4 border-red-800 relative group/card rounded-sm glow-green">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover/card:opacity-25 transition-all duration-1000 rotate-12 group-hover/card:rotate-0">
                    <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
                  </div>
                  
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Real-time Portfolio</span>
                    <span className="px-2 py-0.5 bg-red-900 text-white text-[8px] font-black uppercase tracking-widest rounded-sm">LIVE STATUS</span>
                  </div>

                  <div className="text-5xl font-black text-white tracking-tighter mb-4 group-hover/card:text-red-500 transition-colors">₹4.28 Cr</div>
                  
                  <div className="flex items-center justify-between text-[11px] font-bold text-green-500 uppercase tracking-widest pt-4 border-t border-white/5">
                     <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        +₹5.12L TODAY
                     </span>
                     <span className="text-white/20 italic">0.45% ↑</span>
                  </div>
                  
                  <button className="w-full mt-10 bg-white text-slate-950 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-red-800 hover:text-white shadow-2xl active:scale-95">
                    Execute Analysis
                  </button>
               </div>
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
