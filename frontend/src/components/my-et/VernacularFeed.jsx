"use client";

import { useState } from "react";
import ImpactCard from "./ImpactCard";

const LANGUAGES = ["Hindi", "Tamil", "Telugu", "Bengali"];

export default function VernacularFeed({ articles = [] }) {
  const [vernacularOn, setVernacularOn] = useState(false);
  const [language, setLanguage] = useState("Hindi");

  // Prevent error if articles empty
  const featured = articles[0] || {};
  const primary = articles.slice(1, 3);
  const secondary = articles.slice(3, 8);

  return (
    <div className="flex flex-col gap-12">
      {/* 1. Control Console Layer */}
      <div className="bg-slate-950 text-white p-8 rounded-sm shadow-2xl shadow-slate-950/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-red-900/10 rounded-full blur-[80px]"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
           <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 mb-1">Intelligence Layer Module</span>
              <h3 className="text-xl font-serif font-black italic tracking-tighter transition-all group-hover:text-red-100">Tailoring your command feed...</h3>
           </div>

           <div className="flex items-center gap-8">
              <div className="flex bg-slate-900 p-1 rounded-sm border border-slate-800 shadow-inner">
                 {["English", "Vernacular", "Compare"].map((l) => {
                    const modeId = l === "English" ? false : l.toLowerCase();
                    return (
                      <button
                        key={l}
                        onClick={() => setVernacularOn(modeId)}
                        className={`px-8 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${vernacularOn === modeId ? "bg-white text-slate-950 shadow-xl" : "text-slate-500 hover:text-white"}`}
                      >
                        {l}
                      </button>
                    )
                 })}
              </div>

              {vernacularOn && (
                <div className="flex items-center gap-3 bg-slate-900 px-6 py-2.5 rounded-sm border border-slate-800">
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Target:</span>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-transparent border-none text-white text-[10px] font-black uppercase tracking-[0.2em] focus:ring-0 cursor-pointer"
                  >
                    {LANGUAGES.map(lang => (
                      <option key={lang} value={lang} className="bg-slate-950">{lang.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* 2. Content Hierarchy Tiers */}
      
      {/* TIER 1: FEATURED STORY */}
      <section>
        <ImpactCard 
          article={featured}
          headline={featured.headline}
          summary={featured.summary}
          vernacularOn={vernacularOn}
          language={language}
          hierarchy="featured"
        />
      </section>

      {/* TIER 2: PRIMARY STORIES GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
         {primary.map(article => (
           <ImpactCard 
             key={article.id}
             article={article}
             headline={article.headline}
             summary={article.summary}
             vernacularOn={vernacularOn}
             language={language}
             hierarchy="normal"
           />
         ))}
      </section>

      {/* TIER 3: SECONDARY COMPACT FEED */}
      <section className="bg-slate-50 p-10 border border-slate-100 rounded-sm">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 pb-2 border-b border-slate-200 italic">Historical Context & Secondary Briefs</h3>
        <div className="flex flex-col gap-2">
          {secondary.map(article => (
            <ImpactCard 
              key={article.id}
              article={article}
              headline={article.headline}
              summary={article.summary}
              vernacularOn={vernacularOn}
              language={language}
              hierarchy="compact"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
