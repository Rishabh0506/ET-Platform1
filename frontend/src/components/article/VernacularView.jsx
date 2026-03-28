"use client";

import { useState } from "react";
import { useVernacular } from "@/hooks/useVernacular";
import ArticleContent from "./ArticleContent";
import SideBySide from "./SideBySide";

const LANGUAGES = ["Hindi", "Tamil", "Telugu", "Bengali"];

export default function VernacularView({ article }) {
  const [mode, setMode] = useState("english"); // "english" | "vernacular" | "compare"
  const [language, setLanguage] = useState("Hindi");
  const { content, loading, fetchVernacular } = useVernacular(article);

  function handleModeChange(newMode) {
    setMode(newMode);
    if (newMode === "vernacular") fetchVernacular(language);
    // SideBySide fetches internally on mount
  }

  function handleLanguageChange(e) {
    const lang = e.target.value;
    setLanguage(lang);
    if (mode === "vernacular") fetchVernacular(lang);
  }

  const showLanguagePicker = mode === "vernacular" || mode === "compare";

  return (
    <div>
      {/* Controls bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-gray-100 pb-4">
        {/* View mode toggle */}
        <div className="flex rounded border border-gray-200 overflow-hidden text-xs font-medium">
          {[
            { id: "english", label: "English" },
            { id: "vernacular", label: "Your Language" },
            { id: "compare", label: "Compare View" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleModeChange(id)}
              className={`px-3 py-1.5 transition-all duration-200 active:scale-95 ${
                mode === id
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Language picker */}
        {showLanguagePicker && (
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

        {mode !== "english" && (
          <span className="text-xs text-gray-400">✨ Culturally Adapted</span>
        )}
      </div>

      {/* Content */}
      {mode === "english" && (
        <ArticleContent summary={article.summary} body={article.body} />
      )}

      {mode === "vernacular" && (
        loading ? (
          <p className="text-sm text-gray-400 italic">Translating…</p>
        ) : (
          <p className="text-base text-gray-700 leading-loose">{content}</p>
        )
      )}

      {mode === "compare" && (
        <SideBySide article={article} language={language} />
      )}
    </div>
  );
}
