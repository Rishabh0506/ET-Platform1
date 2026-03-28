import { articles as mockArticles } from "./articles";

const BACKEND_URL = "http://127.0.0.1:8000";

/**
 * Fetch all articles from the backend API.
 * Falls back to mock data if the backend is unreachable.
 *
 * @returns {Promise<Array>} List of articles
 */
export async function getArticles() {
  try {
    const res = await fetch(`${BACKEND_URL}/articles`, { cache: "no-store" });
    return res.json();
  } catch {
    console.warn("Backend unreachable — using mock data.");
    return mockArticles;
  }
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
