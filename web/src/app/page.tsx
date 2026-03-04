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
    <div className="space-y-16 pb-12">
      {/* Hero */}
      <section className="text-center space-y-6 pt-8">
        <div className="inline-block">
          <h1 className="text-5xl md:text-6xl font-bold animate-shimmer pb-2">
            Gielinor Scavenger League
          </h1>
          <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
        </div>
        <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Weekly drop-verified scavenger competitions.
          <span className="block text-zinc-400 mt-2">
            No accounts • No manual submissions • Pure RuneLite drop tracking
          </span>
        </p>
        <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-xl px-6 py-3 shadow-lg">
            <span className="text-zinc-400 text-xs uppercase tracking-wider block mb-1">
              Current Season
            </span>
            <span className="text-amber-400 font-bold text-2xl">
              #{season.seasonNumber}
            </span>
          </div>
          <SeasonTimer endTime={season.endTime.toISOString()} />
        </div>
      </section>

      {/* Board */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-zinc-100 mb-2">
            Season {season.seasonNumber} Board
          </h2>
          <p className="text-zinc-500 text-sm">
            Collect these 25 items to earn points and win!
          </p>
        </div>
        <Board tiles={boardTiles} />
        <div className="flex justify-center gap-6 flex-wrap text-xs">
          <span className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 rounded-lg px-3 py-2">
            <span className="w-3 h-3 rounded border-2 border-emerald-500 bg-emerald-900/20" />
            <span className="text-emerald-400 font-medium">Free</span>
          </span>
          <span className="flex items-center gap-2 bg-slate-950/40 border border-slate-500/30 rounded-lg px-3 py-2">
            <span className="w-3 h-3 rounded border-2 border-slate-500 bg-slate-900/50" />
            <span className="text-slate-300 font-medium">Common</span>
            <span className="text-slate-500">(5 pts)</span>
          </span>
          <span className="flex items-center gap-2 bg-blue-950/40 border border-blue-500/30 rounded-lg px-3 py-2">
            <span className="w-3 h-3 rounded border-2 border-blue-500 bg-blue-900/20" />
            <span className="text-blue-300 font-medium">Uncommon</span>
            <span className="text-blue-500">(15 pts)</span>
          </span>
          <span className="flex items-center gap-2 bg-purple-950/40 border border-purple-500/30 rounded-lg px-3 py-2">
            <span className="w-3 h-3 rounded border-2 border-purple-500 bg-purple-900/20" />
            <span className="text-purple-300 font-medium">Rare</span>
            <span className="text-purple-500">(50 pts)</span>
          </span>
        </div>
      </section>

      {/* Leaderboard + Live Feed side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏆</span>
            <h2 className="text-2xl font-bold text-zinc-100">Leaderboard</h2>
          </div>
          <Leaderboard limit={10} />
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📡</span>
            <h2 className="text-2xl font-bold text-zinc-100">Live Drop Feed</h2>
          </div>
          <LiveFeed />
        </section>
      </div>
    </div>
  );
}
