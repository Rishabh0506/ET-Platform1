const insights = [
  "Rising oil prices may push up FMCG input costs — watch ITC and HUL.",
  "RBI's unchanged repo rate signals continued stability in home loan EMIs.",
  "Jio's enterprise AI push could accelerate cloud adoption among mid-cap IT stocks.",
];

export default function DailyBrief() {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
        Daily Brief
      </h2>
      <ul className="flex flex-col gap-3">
        {insights.map((insight, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-700" />
            <p className="text-sm text-gray-700 leading-relaxed">{insight}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
