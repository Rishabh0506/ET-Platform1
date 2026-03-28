import { getArticles } from "@/data/dataService";
import NewsCard from "./NewsCard";

export default async function NewsFeed() {
  const articles = await getArticles();

  return (
    <section className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex flex-col gap-5">
        {articles.map((article) => (
          <NewsCard
            key={article.id}
            id={article.id}
            headline={article.headline}
            summary={article.summary}
          />
        ))}
      </div>
    </section>
  );
}
