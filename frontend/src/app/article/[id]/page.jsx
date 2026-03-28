import ArticleContainer from "@/components/article/ArticleContainer";

export default function ArticlePage({ params }) {
  return <ArticleContainer id={params.id} />;
}
