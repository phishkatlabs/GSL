import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateActiveSeason } from "@/lib/season";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "50"), 100);

    const season = await getOrCreateActiveSeason();

    const drops = await prisma.drop.findMany({
      where: { seasonId: season.id },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        player: { select: { rsn: true } },
      },
    });

    // Enrich with item names from season items
    const itemMap = new Map(season.items.map((si) => [si.itemId, si]));

    const feed = drops.map((drop) => {
      const seasonItem = itemMap.get(drop.itemId);
      return {
        id: drop.id,
        rsn: drop.player.rsn,
        itemId: drop.itemId,
        itemName: seasonItem?.itemName ?? `Item #${drop.itemId}`,
        points: seasonItem?.points ?? 0,
        tier: seasonItem?.difficultyTier ?? "unknown",
        npcId: drop.npcId,
        quantity: drop.quantity,
        world: drop.world,
        timestamp: drop.timestamp,
        createdAt: drop.createdAt,
      };
    });

    return NextResponse.json({
      season: season.seasonNumber,
      feed,
    });
  } catch (error) {
    console.error("Live feed error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
