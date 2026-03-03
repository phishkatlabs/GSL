import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateActiveSeason, checkBingo, checkRaceComplete } from "@/lib/season";

// In-memory rate limiter: RSN -> timestamps[]
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 20; // max requests per minute
const RATE_WINDOW = 60_000; // 1 minute in ms

function isRateLimited(rsn: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(rsn) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW);
  rateLimitMap.set(rsn, recent);

  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { rsn, itemId, npcId, quantity, world, timestamp } = body;

    // Validate required fields
    if (!rsn || typeof rsn !== "string") {
      return NextResponse.json({ error: "RSN is required" }, { status: 400 });
    }
    if (!itemId || typeof itemId !== "number") {
      return NextResponse.json({ error: "itemId is required" }, { status: 400 });
    }

    const normalizedRsn = rsn.toLowerCase().trim();

    // Rate limit check
    if (isRateLimited(normalizedRsn)) {
      return NextResponse.json(
        { error: "Rate limited. Max 20 requests per minute." },
        { status: 429 }
      );
    }

    // Get active season (lazy init)
    const season = await getOrCreateActiveSeason();

    // Verify timestamp is within season window
    const dropTime = timestamp ? new Date(timestamp * 1000) : new Date();
    if (dropTime < season.startTime || dropTime >= season.endTime) {
      return NextResponse.json(
        { error: "Drop timestamp outside active season window" },
        { status: 400 }
      );
    }

    // Verify item is in this season's board
    const seasonItem = season.items.find((si) => si.itemId === itemId);
    if (!seasonItem) {
      return NextResponse.json(
        { error: "Item not on this season's board" },
        { status: 400 }
      );
    }

    // Upsert player
    const player = await prisma.player.upsert({
      where: { rsn: normalizedRsn },
      update: {},
      create: { rsn: normalizedRsn },
    });

    // Check if already completed this tile
    const existingProgress = await prisma.playerProgress.findUnique({
      where: {
        seasonId_playerId_itemId: {
          seasonId: season.id,
          playerId: player.id,
          itemId,
        },
      },
    });

    // Always record the drop (immutable log)
    const drop = await prisma.drop.create({
      data: {
        seasonId: season.id,
        playerId: player.id,
        itemId,
        npcId: npcId ?? null,
        quantity: quantity ?? 1,
        world: world ?? null,
        timestamp: dropTime,
      },
    });

    let tileCompleted = false;

    // If tile not already completed, mark progress
    if (!existingProgress) {
      await prisma.playerProgress.create({
        data: {
          seasonId: season.id,
          playerId: player.id,
          itemId,
          dropId: drop.id,
        },
      });
      tileCompleted = true;

      // Check bingo/race win conditions
      const allProgress = await prisma.playerProgress.findMany({
        where: { seasonId: season.id, playerId: player.id },
        include: {
          drop: {
            include: {
              season: { include: { items: true } },
            },
          },
        },
      });

      // Build set of completed board positions
      const completedPositions = new Set<number>();
      for (const prog of allProgress) {
        const si = season.items.find((i) => i.itemId === prog.itemId);
        if (si) completedPositions.add(si.boardPosition);
      }

      // Check bingo winner (first to complete row/col/diagonal)
      if (!season.bingoWinnerRsn && checkBingo(completedPositions)) {
        await prisma.season.update({
          where: { id: season.id },
          data: {
            bingoWinnerRsn: normalizedRsn,
            bingoCompletedAt: new Date(),
          },
        });
      }

      // Check race winner (first to complete all 25)
      if (!season.raceWinnerRsn && checkRaceComplete(completedPositions)) {
        await prisma.season.update({
          where: { id: season.id },
          data: {
            raceWinnerRsn: normalizedRsn,
            raceCompletedAt: new Date(),
          },
        });
      }
    }

    // Calculate total points for this player this season
    const pointsResult = await prisma.$queryRaw<[{ total: bigint }]>`
      SELECT COALESCE(SUM(si.points), 0) as total
      FROM player_progress pp
      JOIN season_items si ON si.season_id = pp.season_id AND si.item_id = pp.item_id
      WHERE pp.season_id = ${season.id} AND pp.player_id = ${player.id}
    `;
    const totalPoints = Number(pointsResult[0]?.total ?? 0);

    return NextResponse.json({
      success: true,
      tileCompleted,
      totalPoints,
      item: seasonItem.itemName,
      dropId: drop.id,
    });
  } catch (error) {
    console.error("Drop submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
