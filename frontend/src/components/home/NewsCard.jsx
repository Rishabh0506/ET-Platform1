export default function NewsCard({ headline, summary }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="mb-2 text-lg font-bold text-gray-900 leading-snug">
        {headline}
      </h2>
      <p className="text-sm text-gray-500 leading-relaxed">{summary}</p>
    </div>
  );
}
