"use client";

import { useState, useEffect } from "react";
import ImpactCard from "./ImpactCard";

const LANGUAGES = ["Hindi", "Tamil", "Telugu", "Bengali"];

export default function VernacularFeed({ articles = [] }) {
  const [vernacularOn, setVernacularOn] = useState(false);
  const [language, setLanguage] = useState("Hindi");

  useEffect(() => {
    const handleMode = (e) => {
      if (e.detail === "Vernacular") {
        setVernacularOn("vernacular");
      } else {
        setVernacularOn(false);
      }
    };
    if (typeof document !== "undefined") {
      document.addEventListener("vernacularMode", handleMode);
      return () => document.removeEventListener("vernacularMode", handleMode);
    }
  }, []);

  // Prevent error if articles empty
  const featured = articles[0] || {};
  const primary = articles.slice(1, 3);
  const secondary = articles.slice(3, 8);

  return (
    <div className="flex flex-col gap-12">
      {/* Content Hierarchy Tiers */}
      
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
