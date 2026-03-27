import { articles } from "./articles";

/**
 * Fetch all articles.
 * Currently returns mock data.
 * To switch to an API, replace the implementation here — callers stay unchanged.
 *
 * @returns {Promise<Array>} List of articles
 */
export async function getArticles() {
  return articles;
}

/**
 * Fetch a single article by ID.
 *
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export async function getArticleById(id) {
  return articles.find((article) => article.id === id) ?? null;
}
