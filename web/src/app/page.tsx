import Board from "@/components/Board";
import Leaderboard from "@/components/Leaderboard";
import LiveFeed from "@/components/LiveFeed";
import SeasonTimer from "@/components/SeasonTimer";
import { getOrCreateActiveSeason } from "@/lib/season";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const season = await getOrCreateActiveSeason();

  const boardTiles = season.items.map((item) => ({
    position: item.boardPosition,
    row: Math.floor(item.boardPosition / 5),
    col: item.boardPosition % 5,
    itemId: item.itemId,
    itemName: item.itemName,
    points: item.points,
    tier: item.difficultyTier,
  }));

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-400">
          Gielinor Scavenger League
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
          Weekly drop-verified scavenger competitions. No accounts. No manual
          submissions. Pure RuneLite drop tracking.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="bg-zinc-800 rounded-lg px-4 py-2">
            <span className="text-zinc-400">Season </span>
            <span className="text-amber-400 font-bold">{season.seasonNumber}</span>
          </div>
          <SeasonTimer endTime={season.endTime.toISOString()} />
        </div>
      </section>

      {/* Board */}
      <section>
        <h2 className="text-2xl font-bold text-zinc-100 mb-4 text-center">
          Season {season.seasonNumber} Board
        </h2>
        <Board tiles={boardTiles} />
        <div className="flex justify-center gap-4 mt-4 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded border border-green-500/50 bg-green-900/20" /> Free
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded border border-zinc-500/50 bg-zinc-800/50" /> Common (5 pts)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded border border-blue-500/50 bg-blue-900/20" /> Uncommon (15 pts)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded border border-purple-500/50 bg-purple-900/20" /> Rare (50 pts)
          </span>
        </div>
      </section>

      {/* Leaderboard + Live Feed side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Leaderboard</h2>
          <Leaderboard limit={10} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Live Drop Feed</h2>
          <LiveFeed />
        </section>
      </div>
    </div>
  );
}
