import { prisma } from "./db";
import { generateBoard } from "./board";
import type { SeasonWithItems } from "./types";

/**
 * Returns the start of the current or next Sunday at 00:00 UTC.
 * Seasons always run Sunday 00:00 UTC → Sunday 00:00 UTC.
 */
function getCurrentSeasonWindow(): { start: Date; end: Date } {
  const now = new Date();
  const dayOfWeek = now.getUTCDay(); // 0 = Sunday

  // Calculate start of current week (Sunday 00:00 UTC)
  const start = new Date(now);
  start.setUTCDate(now.getUTCDate() - dayOfWeek);
  start.setUTCHours(0, 0, 0, 0);

  // End is exactly 7 days later
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 7);

  return { start, end };
}

/**
 * Lazy-initializes and returns the active season.
 *
 * If no season exists for the current time window, it:
 * 1. Determines the next season number
 * 2. Generates a random seed
 * 3. Creates the season record
 * 4. Generates the 5x5 board and inserts season_items
 *
 * This is called at the top of every API route.
 */
export async function getOrCreateActiveSeason(): Promise<SeasonWithItems> {
  const { start, end } = getCurrentSeasonWindow();

  // Check for existing active season
  const existing = await prisma.season.findFirst({
    where: {
      startTime: { lte: new Date() },
      endTime: { gt: new Date() },
    },
    include: {
      items: {
        orderBy: { boardPosition: "asc" },
      },
    },
  });

  if (existing) {
    return existing;
  }

  // Determine next season number
  const lastSeason = await prisma.season.findFirst({
    orderBy: { seasonNumber: "desc" },
  });
  const nextNumber = (lastSeason?.seasonNumber ?? 0) + 1;

  // Generate seed (random but stored for reproducibility)
  const seed = Math.floor(Math.random() * 2147483647);

  // Create season
  const season = await prisma.season.create({
    data: {
      seasonNumber: nextNumber,
      seed,
      startTime: start,
      endTime: end,
    },
  });

  // Generate board from seed
  const boardItems = generateBoard(seed);

  // Insert season items
  await prisma.seasonItem.createMany({
    data: boardItems.map((item, index) => ({
      seasonId: season.id,
      itemId: item.id,
      itemName: item.name,
      points: item.points,
      difficultyTier: item.tier,
      boardPosition: index,
    })),
  });

  // Return full season with items
  return prisma.season.findUniqueOrThrow({
    where: { id: season.id },
    include: {
      items: {
        orderBy: { boardPosition: "asc" },
      },
    },
  });
}

/**
 * Get a season by number (for archive pages).
 */
export async function getSeasonByNumber(seasonNumber: number): Promise<SeasonWithItems | null> {
  return prisma.season.findUnique({
    where: { seasonNumber },
    include: {
      items: {
        orderBy: { boardPosition: "asc" },
      },
    },
  });
}

/**
 * Check for bingo completion (row, column, or diagonal).
 * Returns the type of bingo achieved, or null.
 */
export function checkBingo(
  completedPositions: Set<number>
): "row" | "column" | "diagonal" | null {
  // Rows: positions 0-4, 5-9, 10-14, 15-19, 20-24
  for (let row = 0; row < 5; row++) {
    const positions = [0, 1, 2, 3, 4].map((col) => row * 5 + col);
    if (positions.every((p) => completedPositions.has(p))) return "row";
  }

  // Columns
  for (let col = 0; col < 5; col++) {
    const positions = [0, 1, 2, 3, 4].map((row) => row * 5 + col);
    if (positions.every((p) => completedPositions.has(p))) return "column";
  }

  // Diagonals
  const diag1 = [0, 6, 12, 18, 24];
  const diag2 = [4, 8, 12, 16, 20];
  if (diag1.every((p) => completedPositions.has(p))) return "diagonal";
  if (diag2.every((p) => completedPositions.has(p))) return "diagonal";

  return null;
}

/**
 * Check if all 25 tiles are completed (race mode).
 */
export function checkRaceComplete(completedPositions: Set<number>): boolean {
  return completedPositions.size === 25;
}
