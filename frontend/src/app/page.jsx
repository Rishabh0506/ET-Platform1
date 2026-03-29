import Link from "next/link";
import LandingHero from "@/components/landing/LandingHero";
import DashboardPreview from "@/components/landing/DashboardPreview";
import NewsFeed from "@/components/home/NewsFeed";
import { getArticles } from "@/lib/api/articles";

export const dynamic = "force-dynamic";

export default async function Home() {
  const articles = await getArticles();

  return (
    <main className="min-h-screen bg-white selection:bg-red-100 selection:text-red-900">
      {/* 1. Premium Landing Hero */}
      <LandingHero />

      {/* 2. Interactive Product Preview */}
      <DashboardPreview />

      {/* 3. Social Proof / Featured Tags */}
      <section className="py-12 bg-slate-50 border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-12 grayscale opacity-40">
            <span className="text-xl font-serif font-bold text-slate-900 tracking-tighter whitespace-nowrap">Economic Times</span>
            <span className="text-xl font-serif font-bold text-slate-900 tracking-tighter whitespace-nowrap">Gizmodo Intelligence</span>
            <span className="text-xl font-serif font-bold text-slate-900 tracking-tighter whitespace-nowrap">The Verge Console</span>
            <span className="text-xl font-serif font-bold text-slate-900 tracking-tighter whitespace-nowrap">HDFC Wealth</span>
        </div>
      </section>

      {/* 4. Trending Feed Preview */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b-2 border-slate-900 pb-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-800 mb-2 block">Live Intelligence</span>
              <h2 className="text-4xl md:text-5xl font-serif font-black text-slate-950 tracking-tighter italic leading-none">
                Trending on the Platform
              </h2>
            </div>
            <a href="/onboarding" className="text-sm font-black uppercase tracking-widest text-red-800 hover:underline underline-offset-8">
              Open Your Newsroom →
            </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
                <NewsFeed />
            </div>
            <div className="lg:col-span-4 bg-slate-50 p-8 border border-slate-100 rounded-sm">
                <h3 className="text-xs font-black uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">AI Insights Preview</h3>
                <div className="flex flex-col gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group cursor-pointer">
                            <span className="text-[9px] font-bold text-red-700 uppercase mb-1 block tracking-widest italic">Personalized Insight</span>
                            <p className="text-sm font-bold text-slate-900 leading-snug group-hover:underline">
                                Why the recent {i === 1 ? 'Nifty rally' : i === 2 ? 'Tech policy' : 'Crypto regulation'} impacts your specific tax bracket.
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* 5. Final CTA Footer */}
      <footer className="bg-slate-950 text-white pt-32 pb-16 px-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 via-slate-900 to-red-900"></div>
        <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-24">
                <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter mb-8 leading-none">
                  Ready for <span className="italic text-red-600">better</span> news?
                </h2>
                <Link 
                    href="/onboarding"
                    className="inline-block px-12 py-6 bg-red-800 text-white text-sm font-black uppercase tracking-[0.3em] hover:bg-white hover:text-slate-950 transition-all active:scale-95 shadow-2xl"
                >
                    Build My Newsroom
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 border-t border-white/10 pt-16">
                <div>
                   <span className="text-2xl font-serif font-black tracking-tighter">ET <span className="text-red-600 italic">AI</span></span>
                   <p className="mt-4 text-xs text-slate-500 font-medium leading-relaxed">
                     The world's first AI-powered financial intelligence layer. Adapted for you.
                   </p>
                </div>
                {[
                  { title: "Network", links: ["Markets", "Tech", "Startup", "Policy"] },
                  { title: "Product", links: ["Intelligence", "Vernacular", "Alerts", "API"] },
                  { title: "Legal", links: ["Privacy", "Terms", "Compliance"] }
                ].map((sec) => (
                  <div key={sec.title}>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 block">{sec.title}</span>
                    <div className="flex flex-col gap-3">
                      {sec.links.map(l => (
                          <a key={l} href="#" className="text-xs text-slate-500 hover:text-white transition-colors">{l}</a>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
        </div>
      </footer>
    </main>
  );
}
