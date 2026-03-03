"use client";

interface BoardTile {
  position: number;
  row: number;
  col: number;
  itemId: number;
  itemName: string;
  points: number;
  tier: string;
}

interface BoardProps {
  tiles: BoardTile[];
  completedItems?: Set<number>; // item IDs that are completed
}

const tierColors: Record<string, string> = {
  free: "border-green-500/50 bg-green-900/20",
  common: "border-zinc-500/50 bg-zinc-800/50",
  uncommon: "border-blue-500/50 bg-blue-900/20",
  rare: "border-purple-500/50 bg-purple-900/20",
  ultra_rare: "border-amber-500/50 bg-amber-900/20",
};

const tierLabels: Record<string, string> = {
  free: "Free",
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  ultra_rare: "Ultra Rare",
};

export default function Board({ tiles, completedItems = new Set() }: BoardProps) {
  // Sort tiles by position to build the grid
  const sorted = [...tiles].sort((a, b) => a.position - b.position);

  return (
    <div className="grid grid-cols-5 gap-2 max-w-2xl mx-auto">
      {sorted.map((tile) => {
        const isCompleted = completedItems.has(tile.itemId);
        return (
          <div
            key={tile.position}
            className={`
              relative border-2 rounded-lg p-2 text-center transition-all
              ${isCompleted
                ? "border-green-400 bg-green-900/40 shadow-[0_0_12px_rgba(74,222,128,0.3)]"
                : tierColors[tile.tier] ?? tierColors.common
              }
            `}
            title={`${tile.itemName} (${tile.points} pts) - ${tierLabels[tile.tier] ?? tile.tier}`}
          >
            <div className="text-xs text-zinc-500 mb-1">
              {tierLabels[tile.tier] ?? tile.tier}
            </div>
            <div className={`text-sm font-medium leading-tight min-h-[2.5rem] flex items-center justify-center ${
              isCompleted ? "text-green-300" : "text-zinc-200"
            }`}>
              {tile.itemName}
            </div>
            <div className={`text-xs mt-1 ${
              isCompleted ? "text-green-400" : "text-amber-400/70"
            }`}>
              {tile.points} pts
            </div>
            {isCompleted && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-xs">
                ✓
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
