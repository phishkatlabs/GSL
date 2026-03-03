import type { Season, SeasonItem } from "@/generated/prisma/client";

export type { Season, SeasonItem };

export type SeasonWithItems = Season & {
  items: SeasonItem[];
};
