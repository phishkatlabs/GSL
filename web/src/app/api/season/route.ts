import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateActiveSeason, getSeasonByNumber } from "@/lib/season";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id") ?? "active";

    if (idParam === "active") {
      const season = await getOrCreateActiveSeason();
      return NextResponse.json({
        id: season.id,
        seasonNumber: season.seasonNumber,
        startTime: season.startTime,
        endTime: season.endTime,
        bingoWinner: season.bingoWinnerRsn,
        bingoCompletedAt: season.bingoCompletedAt,
        raceWinner: season.raceWinnerRsn,
        raceCompletedAt: season.raceCompletedAt,
        isActive: true,
        itemCount: season.items.length,
      });
    }

    if (idParam === "list") {
      const seasons = await prisma.season.findMany({
        orderBy: { seasonNumber: "desc" },
        select: {
          id: true,
          seasonNumber: true,
          startTime: true,
          endTime: true,
          bingoWinnerRsn: true,
          raceWinnerRsn: true,
        },
      });

      return NextResponse.json({ seasons });
    }

    // Specific season by number
    const num = parseInt(idParam);
    if (isNaN(num)) {
      return NextResponse.json({ error: "Invalid season id" }, { status: 400 });
    }

    const season = await getSeasonByNumber(num);
    if (!season) {
      return NextResponse.json({ error: "Season not found" }, { status: 404 });
    }

    const now = new Date();
    return NextResponse.json({
      id: season.id,
      seasonNumber: season.seasonNumber,
      startTime: season.startTime,
      endTime: season.endTime,
      bingoWinner: season.bingoWinnerRsn,
      bingoCompletedAt: season.bingoCompletedAt,
      raceWinner: season.raceWinnerRsn,
      raceCompletedAt: season.raceCompletedAt,
      isActive: now >= season.startTime && now < season.endTime,
      itemCount: season.items.length,
    });
  } catch (error) {
    console.error("Season error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
