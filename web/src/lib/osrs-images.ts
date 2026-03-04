/**
 * Utility to get OSRS item image URLs from the Old School RuneScape Wiki.
 * Uses the static CDN for item icons.
 */

export function getItemImageUrl(itemId: number, itemName: string): string {
  // OSRS Wiki uses item names with underscores and _detail suffix for inventory icons
  // Format: https://oldschool.runescape.wiki/images/{Item_name}_detail.png
  // Special cases: some items use singular form (e.g. "Avantoe seed" becomes "Avantoe_seed_5")
  let formatted = itemName.replace(/ /g, "_").replace(/'/g, "%27");

  // Try multiple naming patterns as fallbacks
  // Primary: Item_name_detail.png
  return `https://oldschool.runescape.wiki/images/${formatted}_detail.png`;
}

export function getItemImageUrlByName(itemName: string): string {
  // Format item name for Wiki URL (spaces -> underscores, proper encoding)
  const formatted = itemName.replace(/ /g, "_").replace(/'/g, "%27");
  return `https://oldschool.runescape.wiki/images/${formatted}_detail.png`;
}
