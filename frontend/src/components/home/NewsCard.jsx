import Link from "next/link";

export default function NewsCard({ id, headline, summary }) {
  const imageUrl = `https://picsum.photos/seed/${id}/400/400`;

  return (
    <Link href={`/article/${id}`} className="block group">
      <div className="flex gap-8 rounded-sm border border-slate-100 bg-white p-6 hover:shadow-2xl hover:shadow-red-900/5 hover:-translate-y-1 transition-all duration-500 ease-out cursor-pointer relative overflow-hidden group">
        {/* Subtle Side Accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Thumbnail (High Contrast) */}
        <div className="hidden sm:block h-28 w-28 flex-shrink-0 overflow-hidden bg-slate-50 border border-slate-100 rounded-sm">
          <img
            src={imageUrl}
            alt={headline}
            className="h-full w-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-[10px] font-black text-red-800 uppercase tracking-[0.3em] mb-3 block italic opacity-50 group-hover:opacity-100 transition-opacity">
            Deep Intelligence →
          </span>
          <h2 className="mb-2 text-xl font-serif font-black text-slate-950 leading-tight group-hover:text-red-900 transition-colors tracking-tight">
            {headline}
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
            {summary}
          </p>
        </div>
      </div>
    </Link>
  );
}
