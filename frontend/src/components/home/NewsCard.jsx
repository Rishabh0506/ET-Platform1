import Link from "next/link";

export default function NewsCard({ id, headline, summary }) {
  return (
    <Link href={`/article/${id}`} className="block group">
      <div className="rounded-lg border border-gray-200 bg-white p-5 group-hover:border-gray-300 transition-colors">
        <h2 className="mb-2 text-lg font-bold text-gray-900 leading-snug group-hover:text-gray-700">
          {headline}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">{summary}</p>
      </div>
    </Link>
  );
}
