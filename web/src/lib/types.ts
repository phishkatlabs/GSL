import type { Season, SeasonItem, Drop, Player } from "@/generated/prisma";

export type { Season, SeasonItem, Drop, Player };

export type SeasonWithItems = Season & {
  items: SeasonItem[];
};
