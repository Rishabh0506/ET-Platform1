"use client";

import { useState } from "react";
import { useVernacular } from "@/hooks/useVernacular";
import ArticleContent from "./ArticleContent";

const LANGUAGES = ["Hindi", "Tamil", "Telugu", "Bengali"];

export default function VernacularView({ article }) {
  const [vernacularOn, setVernacularOn] = useState(false);
  const [language, setLanguage] = useState("Hindi");
  const { content, loading, fetchVernacular } = useVernacular(article);

  function handleToggle(mode) {
    const turning_on = mode === "vernacular";
    setVernacularOn(turning_on);
    if (turning_on) fetchVernacular(language);
  }

  function handleLanguageChange(e) {
    const lang = e.target.value;
    setLanguage(lang);
    if (vernacularOn) fetchVernacular(lang);
  }

  return (
    <div>
      {/* Toggle bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-gray-100 pb-4">
        <div className="flex rounded border border-gray-200 overflow-hidden text-xs font-medium">
          <button
            onClick={() => handleToggle("english")}
            className={`px-3 py-1.5 transition-colors ${
              !vernacularOn
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            English
          </button>
          <button
            onClick={() => handleToggle("vernacular")}
            className={`px-3 py-1.5 transition-colors ${
              vernacularOn
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Your Language
          </button>
        </div>

        {vernacularOn && (
          <select
            value={language}
            onChange={handleLanguageChange}
            className="rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 focus:outline-none"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        )}

        {vernacularOn && (
          <span className="text-xs text-gray-400">✨ Culturally Adapted</span>
        )}
      </div>

      {/* Content */}
      {vernacularOn ? (
        loading ? (
          <p className="text-sm text-gray-400 italic">Translating…</p>
        ) : (
          <p className="text-base text-gray-700 leading-loose">{content}</p>
        )
      ) : (
        <ArticleContent summary={article.summary} body={article.body} />
      )}
    </div>
  );
}
