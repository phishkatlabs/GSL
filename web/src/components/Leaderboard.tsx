"use client";

import { useEffect, useState } from "react";

interface LeaderboardEntry {
  rank: number;
  rsn: string;
  totalPoints: number;
  tilesCompleted: number;
  lastCompletion: string;
}

interface LeaderboardProps {
  seasonParam?: string;
  limit?: number;
}

export default function Leaderboard({ seasonParam = "active", limit = 10 }: LeaderboardProps) {
  const [mode, setMode] = useState<"points" | "bingo" | "race">("points");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/leaderboard?season=${seasonParam}&mode=${mode}&limit=${limit}`
        );
        const data = await res.json();
        setEntries(data.leaderboard ?? []);
        setWinner(data.winner ?? null);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 15_000);
    return () => clearInterval(interval);
  }, [mode, seasonParam, limit]);

  return (
    <div>
      {/* Mode tabs */}
      <div className="flex gap-1 mb-4">
        {(["points", "bingo", "race"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-t text-sm font-medium capitalize transition-colors ${
              mode === m
                ? "bg-zinc-700 text-amber-400"
                : "bg-zinc-800/50 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Winner banner */}
      {winner && (
        <div className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-3 mb-4 text-center">
          <span className="text-amber-400 font-bold">{winner}</span>
          <span className="text-zinc-300"> won {mode} mode!</span>
        </div>
      )}

      {/* Table */}
      <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-700 text-zinc-400 text-sm">
              <th className="py-3 px-4 text-left w-12">#</th>
              <th className="py-3 px-4 text-left">Player</th>
              <th className="py-3 px-4 text-right">
                {mode === "points" ? "Points" : "Tiles"}
              </th>
              <th className="py-3 px-4 text-right">Tiles</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-zinc-500">
                  Loading...
                </td>
              </tr>
            ) : entries.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-zinc-500">
                  No entries yet. Be the first!
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr
                  key={entry.rsn}
                  className="border-b border-zinc-700/50 hover:bg-zinc-700/30 transition-colors"
                >
                  <td className="py-3 px-4 text-zinc-500 font-mono">
                    {entry.rank <= 3 ? (
                      <span className={
                        entry.rank === 1 ? "text-amber-400" :
                        entry.rank === 2 ? "text-zinc-300" :
                        "text-amber-700"
                      }>
                        {entry.rank}
                      </span>
                    ) : (
                      entry.rank
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium text-zinc-100">
                    {entry.rsn}
                  </td>
                  <td className="py-3 px-4 text-right text-amber-400 font-mono">
                    {entry.totalPoints}
                  </td>
                  <td className="py-3 px-4 text-right text-zinc-400 font-mono">
                    {entry.tilesCompleted}/25
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
