const BACKEND_URL = "http://127.0.0.1:8000";

/**
 * Fetch all articles from the backend API.
 *
 * @returns {Promise<Array>} List of articles
 */
export async function getArticles() {
  const res = await fetch(`${BACKEND_URL}/articles`, { cache: "no-store" });
  return res.json();
}

/**
 * Fetch a single article by ID.
 *
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export async function getArticleById(id) {
  const articles = await getArticles();
  return articles.find((article) => article.id === id) ?? null;
}
