import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateActiveSeason, getSeasonByNumber } from "@/lib/season";

interface PointsRow {
  rsn: string;
  total_points: bigint;
  tiles_completed: bigint;
  last_completion: Date;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const seasonParam = searchParams.get("season") ?? "active";
    const mode = searchParams.get("mode") ?? "points";
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "100"), 500);

    // Resolve season
    let season;
    if (seasonParam === "active") {
      season = await getOrCreateActiveSeason();
    } else {
      const num = parseInt(seasonParam);
      if (isNaN(num)) {
        return NextResponse.json(
          { error: "Invalid season parameter" },
          { status: 400 },
        );
      }
      season = await getSeasonByNumber(num);
    }

    if (!season) {
      return NextResponse.json({ error: "Season not found" }, { status: 404 });
    }

    if (mode === "points") {
      // Points mode: count ALL drops (including duplicates)
      const rows = await prisma.$queryRaw<PointsRow[]>`
        SELECT
          p.rsn,
          COALESCE(SUM(si.points * d.quantity), 0) as total_points,
          COUNT(DISTINCT d.item_id) as tiles_completed,
          MAX(d.timestamp) as last_completion
        FROM drops d
        JOIN players p ON p.id = d.player_id
        JOIN season_items si ON si.season_id = d.season_id AND si.item_id = d.item_id
        WHERE d.season_id = ${season.id}
        GROUP BY p.id, p.rsn
        ORDER BY total_points DESC, last_completion ASC
        LIMIT ${limit}
      `;

      return NextResponse.json({
        season: season.seasonNumber,
        mode: "points",
        leaderboard: rows.map((row, index) => ({
          rank: index + 1,
          rsn: row.rsn,
          totalPoints: Number(row.total_points),
          tilesCompleted: Number(row.tiles_completed),
          lastCompletion: row.last_completion,
        })),
      });
    }

    if (mode === "bingo") {
      // Bingo mode: show all players with any progress, sorted by tiles completed
      const rows = await prisma.$queryRaw<PointsRow[]>`
        SELECT
          p.rsn,
          COUNT(pp.id) as tiles_completed,
          COALESCE(SUM(si.points), 0) as total_points,
          MAX(pp.completed_at) as last_completion
        FROM player_progress pp
        JOIN players p ON p.id = pp.player_id
        JOIN season_items si ON si.season_id = pp.season_id AND si.item_id = pp.item_id
        WHERE pp.season_id = ${season.id}
        GROUP BY p.id, p.rsn
        ORDER BY tiles_completed DESC, last_completion ASC
        LIMIT ${limit}
      `;

      return NextResponse.json({
        season: season.seasonNumber,
        mode: "bingo",
        winner: season.bingoWinnerRsn ?? null,
        winnerTime: season.bingoCompletedAt ?? null,
        leaderboard: rows.map((row, index) => ({
          rank: index + 1,
          rsn: row.rsn,
          tilesCompleted: Number(row.tiles_completed),
          totalPoints: Number(row.total_points),
          lastCompletion: row.last_completion,
        })),
      });
    }

    if (mode === "race") {
      const rows = await prisma.$queryRaw<PointsRow[]>`
        SELECT
          p.rsn,
          COUNT(pp.id) as tiles_completed,
          COALESCE(SUM(si.points), 0) as total_points,
          MAX(pp.completed_at) as last_completion
        FROM player_progress pp
        JOIN players p ON p.id = pp.player_id
        JOIN season_items si ON si.season_id = pp.season_id AND si.item_id = pp.item_id
        WHERE pp.season_id = ${season.id}
        GROUP BY p.id, p.rsn
        ORDER BY tiles_completed DESC, last_completion ASC
        LIMIT ${limit}
      `;

      return NextResponse.json({
        season: season.seasonNumber,
        mode: "race",
        winner: season.raceWinnerRsn ?? null,
        winnerTime: season.raceCompletedAt ?? null,
        leaderboard: rows.map((row, index) => ({
          rank: index + 1,
          rsn: row.rsn,
          tilesCompleted: Number(row.tiles_completed),
          totalPoints: Number(row.total_points),
          lastCompletion: row.last_completion,
        })),
      });
    }

    return NextResponse.json(
      { error: "Invalid mode. Use: points, bingo, race" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
