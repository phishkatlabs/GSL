"use client";

import { useEffect, useState } from "react";

interface FeedEntry {
  id: string;
  rsn: string;
  itemName: string;
  points: number;
  tier: string;
  world: number | null;
  createdAt: string;
}

const tierDots: Record<string, string> = {
  free: "bg-green-400",
  common: "bg-zinc-400",
  uncommon: "bg-blue-400",
  rare: "bg-purple-400",
  ultra_rare: "bg-amber-400",
};

export default function LiveFeed() {
  const [feed, setFeed] = useState<FeedEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch("/api/live-feed?limit=20");
        const data = await res.json();
        setFeed(data.feed ?? []);
      } catch (err) {
        console.error("Failed to fetch live feed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
    const interval = setInterval(fetchFeed, 5_000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center text-zinc-500 py-8">Loading live feed...</div>
    );
  }

  if (feed.length === 0) {
    return (
      <div className="text-center text-zinc-500 py-8">
        No drops yet this season. Start hunting!
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto">
      {feed.map((entry) => (
        <div
          key={entry.id}
          className="flex items-center gap-3 bg-zinc-800/50 rounded-lg px-4 py-3 border border-zinc-700/50"
        >
          <div className={`w-2 h-2 rounded-full ${tierDots[entry.tier] ?? tierDots.common}`} />
          <div className="flex-1 min-w-0">
            <span className="text-amber-400 font-medium">{entry.rsn}</span>
            <span className="text-zinc-400"> received </span>
            <span className="text-zinc-100 font-medium">{entry.itemName}</span>
            {entry.world && (
              <span className="text-zinc-500 text-sm"> (W{entry.world})</span>
            )}
          </div>
          <div className="text-xs text-zinc-500 whitespace-nowrap">
            {new Date(entry.createdAt).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
}
