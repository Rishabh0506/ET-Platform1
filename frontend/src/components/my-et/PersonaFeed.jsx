import ImpactCard from "./ImpactCard";

const personalizedArticles = [
  {
    id: "p-001",
    headline: "Sensex Surges 800 Points as Foreign Investors Return",
    summary:
      "Indian equity markets posted sharp gains after FIIs turned net buyers for the third straight session.",
    impact:
      "As an investor, this signals renewed institutional confidence. A good time to review your large-cap equity exposure.",
  },
  {
    id: "p-002",
    headline: "India's GDP Growth Forecast Revised to 7.2% for FY2026",
    summary:
      "IMF upgraded India's growth outlook citing strong domestic consumption and infrastructure investment.",
    impact:
      "Sustained growth at this pace supports long-term equity returns. Infrastructure and consumption-linked funds may benefit.",
  },
  {
    id: "p-003",
    headline: "Startups Raise $1.2B in Q1 2026 as VC Sentiment Improves",
    summary:
      "Indian startups attracted over $1.2 billion in Q1, driven by fintech, climate tech, and AI sectors.",
    impact:
      "Rising VC activity often precedes IPO pipelines. Keep an eye on emerging fintech and AI-focused public offerings.",
  },
];

export default function PersonaFeed() {
  return (
    <div>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
        Personalized For You
      </h2>
      <div className="flex flex-col gap-5">
        {personalizedArticles.map((article) => (
          <ImpactCard
            key={article.id}
            headline={article.headline}
            summary={article.summary}
            impact={article.impact}
          />
        ))}
      </div>
    </div>
  );
}
