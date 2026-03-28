export default function ArticleContent({ summary, body }) {
  return (
    <div className="prose prose-gray max-w-none">
      <p className="mb-5 text-base font-medium text-gray-600 leading-relaxed">
        {summary}
      </p>
      <hr className="my-6 border-gray-100" />
      <p className="text-base text-gray-700 leading-loose">{body}</p>
    </div>
  );
}
