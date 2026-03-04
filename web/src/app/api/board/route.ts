import { NextRequest, NextResponse } from "next/server";
import { getOrCreateActiveSeason, getSeasonByNumber } from "@/lib/season";
import type { SeasonItem } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const seasonParam = searchParams.get("season") ?? "active";

    let season;
    if (seasonParam === "active") {
      season = await getOrCreateActiveSeason();
    } else {
      const num = parseInt(seasonParam);
      if (isNaN(num)) {
        return NextResponse.json({ error: "Invalid season parameter" }, { status: 400 });
      }
      season = await getSeasonByNumber(num);
    }

    if (!season) {
      return NextResponse.json({ error: "Season not found" }, { status: 404 });
    }

    const board = season.items.map((item: SeasonItem) => ({
      position: item.boardPosition,
      row: Math.floor(item.boardPosition / 5),
      col: item.boardPosition % 5,
      itemId: item.itemId,
      itemName: item.itemName,
      points: item.points,
      tier: item.difficultyTier,
    }));

    return NextResponse.json({
      season: season.seasonNumber,
      startTime: season.startTime,
      endTime: season.endTime,
      board,
    });
  } catch (error) {
    console.error("Board error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
