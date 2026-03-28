export default function ArticleHeader({ headline, category, timestamp }) {
  const date = new Date(timestamp).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-500">
          {category}
        </span>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
      <h1 className="text-2xl font-bold leading-snug text-gray-900">
        {headline}
      </h1>
    </div>
  );
}
