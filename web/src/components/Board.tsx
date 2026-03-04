"use client";

import { getItemImageUrl } from "@/lib/osrs-images";
import Image from "next/image";
import { useState } from "react";

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
  free: "border-emerald-500/60 bg-emerald-950/40",
  common: "border-slate-500/50 bg-slate-900/50",
  uncommon: "border-blue-500/60 bg-blue-950/40",
  rare: "border-purple-500/60 bg-purple-950/40",
  ultra_rare: "border-amber-500/60 bg-amber-950/40",
};

const tierGlow: Record<string, string> = {
  free: "shadow-[0_0_8px_rgba(16,185,129,0.2)]",
  common: "shadow-[0_0_8px_rgba(100,116,139,0.2)]",
  uncommon: "shadow-[0_0_8px_rgba(59,130,246,0.3)]",
  rare: "shadow-[0_0_8px_rgba(168,85,247,0.3)]",
  ultra_rare: "shadow-[0_0_12px_rgba(245,158,11,0.4)]",
};

const tierLabels: Record<string, string> = {
  free: "Free",
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  ultra_rare: "Ultra Rare",
};

function ItemImage({ itemId, itemName }: { itemId: number; itemName: string }) {
  const [imgSrc, setImgSrc] = useState(() => getItemImageUrl(itemId, itemName));
  const [attempts, setAttempts] = useState(0);

  const handleError = () => {
    // Try fallback URLs for seeds and other items with alternate naming
    if (attempts === 0 && itemName.toLowerCase().includes("seed")) {
      // Some seeds use numbered format like "Avantoe_seed_5.png"
      const formatted = itemName.replace(/ /g, "_").replace(/'/g, "%27");
      setImgSrc(`https://oldschool.runescape.wiki/images/${formatted}_5.png`);
      setAttempts(1);
    } else if (attempts === 1) {
      // Try without _detail suffix
      const formatted = itemName.replace(/ /g, "_").replace(/'/g, "%27");
      setImgSrc(`https://oldschool.runescape.wiki/images/${formatted}.png`);
      setAttempts(2);
    } else {
      // Hide image after all attempts
      setImgSrc("");
    }
  };

  if (!imgSrc) {
    return (
      <div className="w-9 h-9 bg-zinc-700/50 rounded flex items-center justify-center text-zinc-500 text-xs">
        ?
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={itemName}
      style={{
        width: "auto",
        height: "auto",
        maxWidth: "36px",
        maxHeight: "36px",
      }}
      className="pixelated"
      onError={handleError}
    />
  );
}

export default function Board({
  tiles,
  completedItems = new Set(),
}: BoardProps) {
  // Sort tiles by position to build the grid
  const sorted = [...tiles].sort((a, b) => a.position - b.position);

  return (
    <div className="grid grid-cols-5 gap-3 max-w-3xl mx-auto">
      {sorted.map((tile) => {
        const isCompleted = completedItems.has(tile.itemId);
        return (
          <div
            key={tile.position}
            className={`
              relative border-2 rounded-xl p-3 text-center transition-all hover:scale-105 cursor-pointer
              ${
                isCompleted
                  ? "border-emerald-400 bg-emerald-900/50 shadow-[0_0_16px_rgba(52,211,153,0.4)]"
                  : `${tierColors[tile.tier] ?? tierColors.common} ${tierGlow[tile.tier] ?? ""} hover:brightness-110`
              }
            `}
            title={`${tile.itemName} (${tile.points} pts) - ${tierLabels[tile.tier] ?? tile.tier}`}
          >
            {/* Item Image */}
            <div className="mb-2 flex justify-center">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <ItemImage itemId={tile.itemId} itemName={tile.itemName} />
              </div>
            </div>

            {/* Item Name */}
            <div
              className={`text-xs font-semibold leading-tight min-h-[2rem] flex items-center justify-center mb-1 ${
                isCompleted ? "text-emerald-200" : "text-zinc-100"
              }`}
            >
              {tile.itemName}
            </div>

            {/* Points & Tier */}
            <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-white/10">
              <span
                className={`font-mono ${
                  isCompleted ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                {tile.points}pts
              </span>
              <span className="text-zinc-500 text-[10px]">
                {tierLabels[tile.tier]}
              </span>
            </div>

            {/* Completion Checkmark */}
            {isCompleted && (
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-sm shadow-lg animate-pulse">
                ✓
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
