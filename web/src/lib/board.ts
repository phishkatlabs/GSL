import seedrandom from "seedrandom";
import {
  FREE_ITEMS,
  COMMON_ITEMS,
  UNCOMMON_ITEMS,
  RARE_ITEMS,
  BOARD_SIZE,
  type ScavengerItem,
} from "./items";

/**
 * Generates a deterministic 5x5 board given a season seed.
 *
 * Board composition: 1 Free + 10 Common + 10 Uncommon + 4 Rare = 25 tiles
 *
 * The same seed always produces the same board, enabling reproducible
 * season boards without storing item selections separately.
 */
export function generateBoard(seed: number): ScavengerItem[] {
  const rng = seedrandom(seed.toString());

  const pick = <T>(arr: T[], count: number): T[] => {
    const pool = [...arr];
    const picks: T[] = [];
    for (let i = 0; i < count && pool.length > 0; i++) {
      const idx = Math.floor(rng() * pool.length);
      picks.push(pool.splice(idx, 1)[0]);
    }
    return picks;
  };

  const freeItems = pick(FREE_ITEMS, 1);
  const commonItems = pick(COMMON_ITEMS, 10);
  const uncommonItems = pick(UNCOMMON_ITEMS, 10);
  const rareItems = pick(RARE_ITEMS, 4);

  const allItems = [...freeItems, ...commonItems, ...uncommonItems, ...rareItems];

  if (allItems.length !== BOARD_SIZE) {
    throw new Error(
      `Board generation failed: expected ${BOARD_SIZE} items, got ${allItems.length}`
    );
  }

  // Shuffle the board positions using the same seeded RNG
  for (let i = allItems.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [allItems[i], allItems[j]] = [allItems[j], allItems[i]];
  }

  return allItems;
}
