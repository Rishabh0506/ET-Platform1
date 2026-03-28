import Link from "next/link";

export default function LandingHero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-white">
      {/* Decorative blurred background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-50 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-slate-100 rounded-full blur-[100px] opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 mb-8 animate-fade-in">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">The Intelligence Layer is Live</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-serif font-black text-slate-950 tracking-tighter leading-[0.9] mb-8">
          Your Financial <br />
          <span className="text-red-900 italic">Intelligence</span> Layer
        </h1>

        <p className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-12">
          Not just news. Understand precisely what it means for <span className="text-slate-950 font-bold border-b-2 border-red-800">your portfolio</span>, in your language.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/onboarding"
            className="w-full sm:w-auto px-10 py-5 bg-slate-950 text-white rounded-sm text-sm font-black uppercase tracking-widest hover:bg-red-900 transition-all active:scale-95 shadow-2xl shadow-slate-900/20"
          >
            Enter Your Newsroom
          </Link>
          <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-950 border border-slate-200 rounded-sm text-sm font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">
            See How It Works
          </button>
        </div>
      </div>
    </section>
  );
}
