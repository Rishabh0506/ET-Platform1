import { useImpact } from "@/hooks/useImpact";
import { useVernacular } from "@/hooks/useVernacular";
import { useEffect } from "react";

export default function ImpactCard({
  headline,
  summary,
  article,
  vernacularOn = false, // false, "vernacular", or "compare"
  language = "Hindi",
  hierarchy = "normal", // "featured", "normal", "compact"
}) {
  const { impact, loading: impactLoading } = useImpact(article);
  const { content, loading: vernacularLoading, fetchVernacular } = useVernacular(article);

  const isVernacularMode = vernacularOn === "vernacular";
  const isCompareMode = vernacularOn === "compare";

  useEffect(() => {
    if (isVernacularMode || isCompareMode) {
      fetchVernacular(language);
    }
  }, [vernacularOn, language]);

  const isFeatured = hierarchy === "featured";
  const isCompact = hierarchy === "compact";

  // Tag Color Logic
  const getTagColor = (text) => {
    if (text.includes("CRITICAL")) return "bg-red-800 text-white";
    if (text.includes("AI")) return "bg-blue-600 text-white";
    if (text.includes("VERNACULAR") || text.includes("ADAPTED")) return "bg-purple-600 text-white";
    return "bg-slate-900 text-white";
  };

  if (isCompact) {
    return (
      <div className="py-6 border-b border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-slate-50 lg:px-6 transition-all duration-300 rounded-sm">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
             <span className="text-[9px] font-black text-red-800 uppercase tracking-widest italic opacity-40 group-hover:opacity-100 transition-opacity">AI BRIEFING</span>
             <span className="h-1 w-1 rounded-full bg-slate-300"></span>
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Confidence: 94%</span>
          </div>
          <h4 className="text-base font-bold text-slate-900 group-hover:text-red-900 transition-colors leading-tight tracking-tight underline-animate">{headline}</h4>
        </div>
        <div className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-100 group-hover:border-red-900 group-hover:bg-red-50 transition-all">
           <svg className="w-4 h-4 text-slate-300 group-hover:text-red-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
        </div>
      </div>
    );
  }

  // Visual Rhythm: Alternate styles based on hierarchy
  // Featured = Image Left
  // Normal = Image Top
  
  return (
    <div className={`rounded-sm border border-slate-100 bg-white transition-all duration-700 group relative overflow-hidden flex flex-col shadow-layered ${isFeatured ? "p-10 lg:p-14 mb-16 glow-red hover:-translate-y-2" : "p-8 hover:-translate-y-1 hover:shadow-2xl"}`}>
      
      {/* 1. Header Badges & System Labels */}
      <div className="flex items-center gap-4 mb-10">
        <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] italic shadow-xl transition-all ${getTagColor(isFeatured ? "CRITICAL" : "AI IMPACT")}`}>
          {isFeatured ? "CRITICAL ADAPTATION" : "AI DETECTED"}
        </span>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-l border-slate-200 pl-4 italic">
           {article.category || "Markets"}
        </span>
        {isVernacularMode && (
           <span className="px-3 py-1 bg-purple-50 text-purple-700 text-[9px] font-black uppercase tracking-widest rounded-sm ml-auto animate-soft-pulse">
             VERNACULAR ADAPTED
           </span>
        )}
      </div>

      <div className={`flex flex-col ${isFeatured ? "lg:flex-row gap-16" : "gap-10"}`}>
        
        {/* 2. Layered Visual Layer */}
        <div className={`relative flex-shrink-0 overflow-hidden bg-slate-50 shadow-2xl transition-all duration-700 ${isFeatured ? "w-full lg:w-[480px] h-[480px]" : "w-full h-72"}`}>
          <img
            src={`https://picsum.photos/seed/${article.id}/1200/1200`}
            alt={headline}
            className="h-full w-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4">
             <div className="glass-dark px-3 py-1.5 rounded-sm text-[9px] font-black text-white uppercase tracking-widest italic flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse"></span>
                SYSTEM ACTIVE
             </div>
          </div>
        </div>

        {/* 3. Intense Narrative Layer */}
        <div className="flex-1 flex flex-col justify-between pt-2">
          <div>
            <h3 className={`${isFeatured ? "text-4xl lg:text-7xl" : "text-3xl lg:text-4xl"} font-serif font-black text-slate-950 leading-[0.9] tracking-tighter mb-10 group-hover:text-red-900 transition-colors duration-500 underline-animate cursor-default`}>
              {headline}
            </h3>

            {isCompareMode ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-slate-50 pt-10 mb-10">
                <div className="relative">
                   <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4 block">Original Brief</span>
                   <p className="text-sm text-slate-500 italic leading-relaxed">{summary}</p>
                </div>
                <div className="border-l-4 border-red-800 pl-10 relative">
                   <span className="text-[10px] font-black text-red-800 uppercase tracking-[0.3em] mb-4 block opacity-60 italic drop-shadow-sm">Adapted Intelligence</span>
                   <p className="text-lg text-slate-900 font-serif italic font-bold leading-tight">{vernacularLoading ? "Synthesizing Adaptation..." : content}</p>
                </div>
              </div>
            ) : isVernacularMode ? (
               <div className="mb-10 border-l-[6px] border-purple-600 pl-10 font-serif italic text-2xl text-slate-800 leading-snug font-medium">
                  "{vernacularLoading ? "Cross-cultural adaptation in progress..." : content}"
               </div>
            ) : (
              <p className="mb-10 text-xl text-slate-500 leading-relaxed font-serif italic opacity-90 border-l-[6px] border-slate-100 pl-10">
                {summary}
              </p>
            )}
          </div>

          {/* 4. AI Strategic Intelligence Command Bar */}
          <div className={`${isFeatured ? "bg-slate-950 p-12 mt-12" : "bg-slate-50 p-10 mt-8"} rounded-sm relative overflow-hidden shadow-3xl transition-all group/insight`}>
             <div className={`absolute top-0 left-0 w-2 h-full ${isFeatured ? "bg-red-800" : "bg-slate-950"}`}></div>
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
             </div>
             
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <span className={`h-2 w-2 rounded-full animate-soft-pulse ${isFeatured ? "bg-red-600" : "bg-slate-950"}`}></span>
                    <span className={`text-[10px] font-black uppercase tracking-[0.5em] ${isFeatured ? "text-red-500" : "text-slate-500"}`}>
                       Portfolio Intelligence Signal
                    </span>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest italic ${isFeatured ? "text-slate-500" : "text-slate-300"}`}>CONFIDENCE: 92%</span>
             </div>

             <p className={`text-lg font-bold italic leading-tight mb-12 tracking-tight ${isFeatured ? "text-white underline decoration-red-900/40 decoration-[6px] underline-offset-[12px]" : "text-slate-900"}`}>
                {impactLoading ? "Processing exposure triggers..." : impact}
             </p>

             {/* Action Buttons (High Energy Scale Hover) */}
             <div className="flex flex-wrap gap-6">
                <button className={`px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] active:scale-95 transition-all shadow-2xl hover:scale-[1.02] ${isFeatured ? "bg-white text-slate-950 hover:bg-red-800 hover:text-white" : "bg-slate-950 text-white hover:bg-black"}`}>
                   What should I do?
                </button>
                <button className={`px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] active:scale-95 transition-all border hover:scale-[1.02] shadow-layered ${isFeatured ? "border-slate-800 text-slate-500 hover:border-white hover:text-white" : "border-slate-200 text-slate-500 hover:border-slate-950 hover:text-slate-950"}`}>
                   What happens next?
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
