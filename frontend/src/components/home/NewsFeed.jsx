import { getArticles } from "@/lib/api/articles";
import NewsCard from "./NewsCard";

export default async function NewsFeed() {
  const articles = await getArticles();

  return (
    <div className="flex flex-col gap-6">
      {articles.slice(5).map((article) => (
        <NewsCard
          key={article.id}
          id={article.id}
          headline={article.headline}
          summary={article.summary}
        />
      ))}
    </div>
  );
}
