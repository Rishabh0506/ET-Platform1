"use client";

import { useImpact } from "@/hooks/useImpact";

export default function ImpactCard({ headline, summary, article }) {
  const { impact, loading } = useImpact(article);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h3 className="mb-2 text-base font-bold text-gray-900 leading-snug">
        {headline}
      </h3>
      <p className="mb-4 text-sm text-gray-500 leading-relaxed">{summary}</p>
      <div className="border-t border-gray-100 pt-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
          ⚡ Why this matters to you
        </p>
        {loading ? (
          <p className="text-sm text-gray-400 italic">Loading insight…</p>
        ) : (
          <p className="text-sm text-gray-700">{impact}</p>
        )}
      </div>
    </div>
  );
}
