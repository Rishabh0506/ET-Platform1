import DailyBrief from "@/components/my-et/DailyBrief";
import VernacularFeed from "@/components/my-et/VernacularFeed";

export const metadata = {
  title: "Your Newsroom | ET AI",
  description: "Personalized news and insights curated for you.",
};

export default function MyET() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Good Evening, Argh 👋
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here&apos;s what matters to you today as an Investor
        </p>
      </div>

      {/* Daily Brief */}
      <div className="mb-10">
        <DailyBrief />
      </div>

      {/* Personalized Feed with Vernacular Toggle */}
      <VernacularFeed />
    </main>
  );
}
