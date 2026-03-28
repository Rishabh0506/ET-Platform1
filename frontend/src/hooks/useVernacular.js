"use client";

import { useState } from "react";
import { getVernacular } from "@/lib/api/vernacular";

/**
 * Fetches a vernacular version of an article on demand.
 *
 * @param {Object} article
 * @returns {{ content, loading, fetch: (language) => void }}
 */
export function useVernacular(article) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchVernacular(language) {
    setLoading(true);
    setContent(null);
    try {
      const text = await getVernacular(article, language);
      setContent(text);
    } catch {
      setContent("Translation unavailable.");
    } finally {
      setLoading(false);
    }
  }

  return { content, loading, fetchVernacular };
}
