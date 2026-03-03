import Board from "@/components/Board";
import Leaderboard from "@/components/Leaderboard";
import LiveFeed from "@/components/LiveFeed";
import SeasonTimer from "@/components/SeasonTimer";
import { getSeasonByNumber } from "@/lib/season";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SeasonPage({ params }: Props) {
  const { id } = await params;
  const seasonNumber = parseInt(id);

  if (isNaN(seasonNumber)) {
    notFound();
  }

  const season = await getSeasonByNumber(seasonNumber);

  if (!season) {
    notFound();
  }

  const now = new Date();
  const isActive = now >= season.startTime && now < season.endTime;

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
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-400">
          Season {season.seasonNumber}
        </h1>
        <p className="text-zinc-400">
          {season.startTime.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          &mdash;{" "}
          {season.endTime.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        {isActive && <SeasonTimer endTime={season.endTime.toISOString()} />}
        {!isActive && (
          <div className="text-zinc-500 text-sm bg-zinc-800 inline-block px-4 py-2 rounded">
            Season Complete
          </div>
        )}
      </section>

      {/* Winners */}
      {(season.bingoWinnerRsn || season.raceWinnerRsn) && (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
          {season.bingoWinnerRsn && (
            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4 text-center">
              <div className="text-sm text-zinc-400 mb-1">Bingo Winner</div>
              <div className="text-lg font-bold text-amber-400">{season.bingoWinnerRsn}</div>
            </div>
          )}
          {season.raceWinnerRsn && (
            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4 text-center">
              <div className="text-sm text-zinc-400 mb-1">Race Winner</div>
              <div className="text-lg font-bold text-amber-400">{season.raceWinnerRsn}</div>
            </div>
          )}
        </section>
      )}

      {/* Board */}
      <section>
        <h2 className="text-2xl font-bold text-zinc-100 mb-4 text-center">Board</h2>
        <Board tiles={boardTiles} />
      </section>

      {/* Leaderboard + Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Leaderboard</h2>
          <Leaderboard seasonParam={id} limit={50} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Drop Feed</h2>
          <LiveFeed />
        </section>
      </div>
    </div>
  );
}
