"use client";

import { useImpact } from "@/hooks/useImpact";
import { useVernacular } from "@/hooks/useVernacular";
import { useEffect } from "react";

export default function ImpactCard({
  headline,
  summary,
  article,
  vernacularOn = false,
  language = "Hindi",
}) {
  const { impact, loading: impactLoading } = useImpact(article);
  const { content, loading: vernacularLoading, fetchVernacular } = useVernacular(article);

  // Fetch vernacular whenever mode turns on or language changes
  useEffect(() => {
    if (vernacularOn) {
      fetchVernacular(language);
    }
  }, [vernacularOn, language]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      {/* Culturally adapted badge */}
      {vernacularOn && (
        <span className="mb-3 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
          ✨ Culturally Adapted · {language}
        </span>
      )}

      <h3 className="mb-2 text-base font-bold text-gray-900 leading-snug">
        {headline}
      </h3>

      {/* Body — vernacular or original */}
      {vernacularOn ? (
        vernacularLoading ? (
          <p className="mb-4 text-sm text-gray-400 italic">Translating…</p>
        ) : (
          <p className="mb-4 text-sm text-gray-700 leading-relaxed">{content}</p>
        )
      ) : (
        <p className="mb-4 text-sm text-gray-500 leading-relaxed">{summary}</p>
      )}

      {/* Impact insight — always shown */}
      <div className="border-t border-gray-100 pt-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
          ⚡ Why this matters to you
        </p>
        {impactLoading ? (
          <p className="text-sm text-gray-400 italic">Loading insight…</p>
        ) : (
          <p className="text-sm text-gray-700">{impact}</p>
        )}
      </div>
    </div>
  );
}
