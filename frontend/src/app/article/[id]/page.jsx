import ArticleContainer from "@/components/article/ArticleContainer";

export default async function ArticlePage({ params }) {
  const { id } = await params;
  return <ArticleContainer id={id} />;
}
