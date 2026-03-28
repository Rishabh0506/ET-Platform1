const BACKEND_URL = "http://127.0.0.1:8000";

/**
 * Fetch a vernacular (native language) version of an article.
 *
 * @param {Object} article - Article object (must include `category`)
 * @param {string} language - e.g. "Hindi", "Tamil", "Telugu", "Bengali"
 * @returns {Promise<string>} The translated/simplified content string
 */
export async function getVernacular(article, language) {
  const res = await fetch(`${BACKEND_URL}/vernacular`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ article, language }),
  });
  const data = await res.json();
  return data.content;
}
