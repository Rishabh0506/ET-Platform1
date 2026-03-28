"use client";

import { useState, useEffect } from "react";
import { getImpact } from "@/lib/api/personalization";

const PERSONA = "Investor"; // hardcoded for now

/**
 * Fetches a personalized impact insight for a given article.
 *
 * @param {Object} article
 * @returns {{ impact: string | null, loading: boolean }}
 */
export function useImpact(article) {
  const [impact, setImpact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getImpact(article, PERSONA)
      .then((text) => {
        if (!cancelled) setImpact(text);
      })
      .catch(() => {
        if (!cancelled) setImpact("Impact insight unavailable.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [article.id]);

  return { impact, loading };
}
