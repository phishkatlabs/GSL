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

export default function Leaderboard({
  seasonParam = "active",
  limit = 10,
}: LeaderboardProps) {
  const [mode, setMode] = useState<"points" | "bingo" | "race">("points");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/leaderboard?season=${seasonParam}&mode=${mode}&limit=${limit}`,
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
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden backdrop-blur-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-zinc-800/50 border-b border-zinc-700 text-zinc-400 text-xs uppercase tracking-wider">
              <th className="py-3 px-4 text-left w-16">
                <span className="text-amber-500">#</span>
              </th>
              <th className="py-3 px-4 text-left">Player</th>
              <th className="py-3 px-4 text-right">
                {mode === "points" ? "Points" : "Tiles"}
              </th>
              <th className="py-3 px-4 text-right hidden sm:table-cell">
                Tiles
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="py-12 text-center">
                  <div className="inline-block w-8 h-8 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
                  <p className="text-zinc-500 mt-2">Loading leaderboard...</p>
                </td>
              </tr>
            ) : entries.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center">
                  <div className="text-4xl mb-2">🏆</div>
                  <p className="text-zinc-400 font-medium">No entries yet</p>
                  <p className="text-zinc-600 text-sm mt-1">
                    Be the first to compete!
                  </p>
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr
                  key={entry.rsn}
                  className={`border-b border-zinc-800/50 hover:bg-zinc-800/40 transition-all ${
                    entry.rank <= 3 ? "bg-zinc-800/20" : ""
                  }`}
                >
                  <td className="py-4 px-4">
                    {entry.rank === 1 ? (
                      <span className="text-2xl" title="1st Place">
                        🥇
                      </span>
                    ) : entry.rank === 2 ? (
                      <span className="text-2xl" title="2nd Place">
                        🥈
                      </span>
                    ) : entry.rank === 3 ? (
                      <span className="text-2xl" title="3rd Place">
                        🥉
                      </span>
                    ) : (
                      <span className="text-zinc-500 font-mono text-sm">
                        {entry.rank}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`font-semibold ${
                        entry.rank === 1
                          ? "text-amber-400"
                          : entry.rank === 2
                            ? "text-zinc-300"
                            : entry.rank === 3
                              ? "text-amber-700"
                              : "text-zinc-200"
                      }`}
                    >
                      {entry.rsn}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-amber-400 font-bold font-mono text-lg">
                      {entry.totalPoints.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right hidden sm:table-cell">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono">
                      <span className="text-emerald-400">
                        {entry.tilesCompleted}
                      </span>
                      <span className="text-zinc-600">/</span>
                      <span className="text-zinc-500">25</span>
                    </span>
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
