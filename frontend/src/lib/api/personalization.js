const BACKEND_URL = "http://127.0.0.1:8000";

/**
 * Fetch a personalized impact insight from the backend.
 *
 * @param {Object} article - Article object (must include `category`)
 * @param {string} persona - e.g. "Investor", "Student", "Small Business Owner"
 * @returns {Promise<string>} The impact insight string
 */
export async function getImpact(article, persona) {
  const res = await fetch(`${BACKEND_URL}/impact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ article, persona }),
  });
  const data = await res.json();
  return data.impact;
}
