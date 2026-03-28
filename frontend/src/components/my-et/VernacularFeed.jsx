"use client";

import { useState } from "react";
import ImpactCard from "./ImpactCard";

const LANGUAGES = ["Hindi", "Tamil", "Telugu", "Bengali"];

const articles = [
  {
    id: "p-001",
    headline: "Sensex Surges 800 Points as Foreign Investors Return",
    summary:
      "Indian equity markets posted sharp gains after FIIs turned net buyers for the third straight session.",
    category: "Markets",
  },
  {
    id: "p-002",
    headline: "India's GDP Growth Forecast Revised to 7.2% for FY2026",
    summary:
      "IMF upgraded India's growth outlook citing strong domestic consumption and infrastructure investment.",
    category: "Economy",
  },
  {
    id: "p-003",
    headline: "Startups Raise $1.2B in Q1 2026 as VC Sentiment Improves",
    summary:
      "Indian startups attracted over $1.2 billion in Q1, driven by fintech, climate tech, and AI sectors.",
    category: "Startups",
  },
];

export default function VernacularFeed() {
  const [vernacularOn, setVernacularOn] = useState(false);
  const [language, setLanguage] = useState("Hindi");

  return (
    <div>
      {/* Section header + controls */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
          Personalized For You
        </h2>

        <div className="flex items-center gap-3">
          {/* Language picker — only visible when vernacular is on */}
          {vernacularOn && (
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 focus:outline-none"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          )}

          {/* Toggle */}
          <button
            onClick={() => setVernacularOn((v) => !v)}
            className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
              vernacularOn
                ? "bg-gray-900 text-white"
                : "border border-gray-300 text-gray-600 hover:border-gray-500"
            }`}
          >
            {vernacularOn ? "Vernacular: ON" : "Vernacular: OFF"}
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-5">
        {articles.map((article) => (
          <ImpactCard
            key={article.id}
            headline={article.headline}
            summary={article.summary}
            article={article}
            vernacularOn={vernacularOn}
            language={language}
          />
        ))}
      </div>
    </div>
  );
}
