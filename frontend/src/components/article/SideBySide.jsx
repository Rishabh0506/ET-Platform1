"use client";

import { useVernacular } from "@/hooks/useVernacular";
import { useEffect } from "react";

export default function SideBySide({ article, language }) {
  const { content, loading, fetchVernacular } = useVernacular(article);

  useEffect(() => {
    fetchVernacular(language);
  }, [language]);

  return (
    <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-6">
      {/* Left — English */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
          English
        </p>
        <p className="mb-4 text-sm font-medium text-gray-600 leading-relaxed">
          {article.summary}
        </p>
        <p className="text-sm text-gray-700 leading-loose">{article.body}</p>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-y-0 -left-3 w-px bg-gray-100" />
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
          {language} ✨
        </p>
        {loading ? (
          <p className="text-sm text-gray-400 italic">Translating…</p>
        ) : (
          <p className="text-sm text-gray-700 leading-loose">{content}</p>
        )}
      </div>
    </div>
  );
}
