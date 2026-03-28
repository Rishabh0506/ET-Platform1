import { getArticleById } from "@/data/dataService";
import ArticleHeader from "./ArticleHeader";
import VernacularView from "./VernacularView";
import Link from "next/link";

export default async function ArticleContainer({ id }) {
  const article = await getArticleById(id);

  if (!article) {
    return (
      <div className="py-20 text-center text-gray-400">
        <p className="text-lg">Article not found.</p>
        <Link href="/" className="mt-4 inline-block text-sm text-gray-500 underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-2xl px-6 py-12">
      <Link
        href="/"
        className="mb-8 inline-block text-xs text-gray-400 hover:text-gray-600 transition-colors"
      >
        ← Back to Home
      </Link>

      <ArticleHeader
        headline={article.headline}
        category={article.category}
        timestamp={article.timestamp}
      />

      <VernacularView article={article} />
    </article>
  );
}
