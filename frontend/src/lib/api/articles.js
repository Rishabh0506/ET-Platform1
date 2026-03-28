export async function getArticles() {
  try {
    const res = await fetch("http://127.0.0.1:8000/articles", {
      cache: "no-store", // Ensure we get fresh data
    });
    if (!res.ok) throw new Error("Failed to fetch articles");
    return res.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    // Return empty array or mock data as fallback
    return [];
  }
}

export async function getArticleById(id) {
  try {
    const articles = await getArticles();
    return articles.find((a) => a.id === id);
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    return null;
  }
}
