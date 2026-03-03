/**
 * Curated OSRS Item Pool for Gielinor Scavenger League
 *
 * Items categorized by drop rarity from NPC/monster kills.
 * Item IDs sourced from the OSRS Wiki Real-time Prices API (/mapping endpoint).
 *
 * Tier definitions:
 * - FREE:    Near-guaranteed drops from basic monsters (1/1 rate). Acts as bingo "free space".
 * - COMMON:  Frequently found on monster drop tables (1/1 to ~1/25 effective rate).
 * - UNCOMMON: Moderate rarity drops, often from slayer/mid-tier bosses (~1/25 to ~1/128).
 * - RARE:    Boss drops and high-tier items (~1/128 to ~1/1000).
 * - ULTRA_RARE: God Wars, raids, and endgame boss drops (1/1000+).
 */

export type DifficultyTier = "free" | "common" | "uncommon" | "rare" | "ultra_rare";

export interface ScavengerItem {
  id: number;
  name: string;
  tier: DifficultyTier;
  points: number;
}

const POINTS: Record<DifficultyTier, number> = {
  free: 1,
  common: 5,
  uncommon: 15,
  rare: 50,
  ultra_rare: 150,
};

function items(tier: DifficultyTier, list: [number, string][]): ScavengerItem[] {
  return list.map(([id, name]) => ({ id, name, tier, points: POINTS[tier] }));
}

// ─── FREE SPACE (trivially common, ~1/1 drops) ────────────────────────────────
export const FREE_ITEMS: ScavengerItem[] = items("free", [
  [526, "Bones"],
  [592, "Ashes"],
  [314, "Feather"],
  [2138, "Raw chicken"],
  [1739, "Cowhide"],
  [1944, "Egg"],
  [2132, "Raw beef"],
  [948, "Bear fur"],
  [946, "Knife"],
  [1059, "Leather gloves"],
]);

// ─── TIER 1: COMMON (~1/1 to ~1/25 from various monsters) ─────────────────────
export const COMMON_ITEMS: ScavengerItem[] = items("common", [
  // Bones & remains
  [532, "Big bones"],
  [536, "Dragon bones"],
  [530, "Bat bones"],
  [534, "Babydragon bones"],

  // Runes (common drops on many tables)
  [561, "Nature rune"],
  [560, "Death rune"],
  [565, "Blood rune"],
  [563, "Law rune"],
  [562, "Chaos rune"],
  [564, "Cosmic rune"],
  [554, "Fire rune"],
  [555, "Water rune"],
  [556, "Air rune"],
  [557, "Earth rune"],
  [558, "Mind rune"],
  [559, "Body rune"],

  // Gems (uncut)
  [1623, "Uncut sapphire"],
  [1621, "Uncut emerald"],
  [1619, "Uncut ruby"],
  [1617, "Uncut diamond"],

  // Ores & bars
  [453, "Coal"],
  [444, "Gold ore"],
  [447, "Mithril ore"],
  [449, "Adamantite ore"],
  [451, "Runite ore"],
  [2353, "Steel bar"],
  [2359, "Mithril bar"],
  [2361, "Adamantite bar"],
  [2357, "Gold bar"],
  [2363, "Runite bar"],

  // Herbs (grimy)
  [207, "Grimy ranarr weed"],
  [213, "Grimy kwuarm"],
  [215, "Grimy cadantine"],
  [2485, "Grimy lantadyme"],
  [217, "Grimy dwarf weed"],
  [211, "Grimy avantoe"],
  [209, "Grimy irit leaf"],
  [3051, "Grimy snapdragon"],
  [219, "Grimy torstol"],

  // Seeds
  [5296, "Toadflax seed"],
  [5297, "Irit seed"],
  [5298, "Avantoe seed"],
  [5299, "Kwuarm seed"],

  // Melee equipment (steel-adamant)
  [1069, "Steel platelegs"],
  [1071, "Mithril platelegs"],
  [1073, "Adamant platelegs"],
  [1119, "Steel platebody"],
  [1121, "Mithril platebody"],
  [1123, "Adamant platebody"],
  [1157, "Steel full helm"],
  [1159, "Mithril full helm"],
  [1161, "Adamant full helm"],
  [1287, "Adamant sword"],
  [1285, "Mithril sword"],
  [1365, "Steel battleaxe"],
  [1369, "Mithril battleaxe"],
  [1371, "Adamant battleaxe"],

  // Rune equipment (common from many high-level monsters)
  [1147, "Rune med helm"],
  [1163, "Rune full helm"],
  [1113, "Rune chainbody"],
  [1127, "Rune platebody"],
  [1079, "Rune platelegs"],
  [1093, "Rune plateskirt"],
  [1201, "Rune kiteshield"],
  [1185, "Rune sq shield"],
  [1373, "Rune battleaxe"],
  [1319, "Rune 2h sword"],
  [1303, "Rune longsword"],
  [1333, "Rune scimitar"],
  [1432, "Rune mace"],
  [1347, "Rune warhammer"],
  [1213, "Rune dagger"],

  // Ranged ammo & weapons
  [892, "Rune arrow"],
  [890, "Adamant arrow"],
  [888, "Mithril arrow"],
  [886, "Steel arrow"],
  [830, "Rune javelin"],
  [868, "Rune knife"],
  [9185, "Rune crossbow"],

  // Dragonhide
  [1753, "Green dragonhide"],
  [1751, "Blue dragonhide"],
  [1749, "Red dragonhide"],
  [1747, "Black dragonhide"],

  // Logs
  [1515, "Yew logs"],
  [1513, "Magic logs"],

  // Misc common drops
  [225, "Limpwurt root"],
  [231, "Snape grass"],
  [985, "Tooth half of key"],
  [987, "Loop half of key"],
  [2366, "Shield left half"],
  [1249, "Dragon spear"],
  [4834, "Long bone"],
  [4835, "Curved bone"],

  // Dragon ammo components
  [19582, "Dragon javelin heads"],
  [11237, "Dragon arrowtips"],
  [11232, "Dragon dart tip"],
]);

// ─── TIER 2: UNCOMMON (~1/25 to ~1/128) ───────────────────────────────────────
export const UNCOMMON_ITEMS: ScavengerItem[] = items("uncommon", [
  // Seeds (rarer)
  [5295, "Ranarr seed"],
  [5300, "Snapdragon seed"],
  [5304, "Torstol seed"],
  [5317, "Yew seed"],
  [5316, "Magic seed"],
  [5289, "Palm tree seed"],
  [22869, "Celastrus seed"],
  [22871, "Redwood tree seed"],
  [22877, "Dragonfruit tree seed"],

  // Dragon equipment
  [1149, "Dragon med helm"],
  [4087, "Dragon platelegs"],
  [4585, "Dragon plateskirt"],
  [3140, "Dragon chainbody"],
  [11840, "Dragon boots"],
  [3204, "Dragon halberd"],
  [21009, "Dragon sword"],
  [4587, "Dragon scimitar"],

  // Mystic robes
  [4089, "Mystic hat"],
  [4091, "Mystic robe top"],
  [4093, "Mystic robe bottom"],
  [4675, "Mystic air staff"],
  [4694, "Mystic water staff"],
  [4689, "Mystic earth staff"],
  [4684, "Mystic fire staff"],
  [3054, "Mystic lava staff"],

  // Ranged & ammo
  [11212, "Dragon dart"],
  [11217, "Dragon arrow"],
  [22804, "Dragon knife"],
  [11235, "Dark bow"],
  [4153, "Granite maul"],
  [1211, "Adamant dagger"],

  // Slayer drops
  [8901, "Black mask (10)"],
  [4131, "Rune boots"],
  [10589, "Granite body"],
  [4585, "Dragon plateskirt"],
  [6528, "Leaf-bladed sword"],
  [20727, "Leaf-bladed battleaxe"],
  [23182, "Basilisk jaw"],

  // Barrows equipment
  [4708, "Ahrim's hood"],
  [4710, "Ahrim's staff"],
  [4712, "Ahrim's robetop"],
  [4714, "Ahrim's robeskirt"],
  [4716, "Dharok's helm"],
  [4718, "Dharok's greataxe"],
  [4720, "Dharok's platebody"],
  [4722, "Dharok's platelegs"],
  [4724, "Guthan's helm"],
  [4726, "Guthan's warspear"],
  [4728, "Guthan's platebody"],
  [4730, "Guthan's chainskirt"],
  [4732, "Karil's coif"],
  [4734, "Karil's crossbow"],
  [4736, "Karil's leathertop"],
  [4738, "Karil's leatherskirt"],
  [4745, "Torag's helm"],
  [4747, "Torag's hammers"],
  [4749, "Torag's platebody"],
  [4751, "Torag's platelegs"],
  [4753, "Verac's helm"],
  [4755, "Verac's flail"],
  [4757, "Verac's brassard"],
  [4759, "Verac's plateskirt"],

  // Rings (DKS)
  [6735, "Warrior ring"],
  [6737, "Berserker ring"],
  [6731, "Seers ring"],
  [6733, "Archers ring"],

  // Bolt tips
  [9193, "Onyx bolt tips"],
  [9192, "Dragonstone bolt tips"],
  [9191, "Diamond bolt tips"],
  [9190, "Ruby bolt tips"],

  // Misc mid-tier
  [1397, "Battlestaff"],
  [6562, "Mud battlestaff"],
  [1615, "Dragonstone"],
  [989, "Crystal key"],
  [23083, "Brimstone key"],
  [19677, "Ancient shard"],
  [19679, "Dark totem base"],
  [19681, "Dark totem middle"],
  [19683, "Dark totem top"],
  [24268, "Sarachnis cudgel"],
  [24514, "Blood shard"],
  [23951, "Enhanced crystal weapon seed"],

  // Boss misc
  [12004, "Dragon pickaxe"],
  [6739, "Dragon axe"],
  [13576, "Dragon warhammer"],
  [9465, "Runite crossbow (u)"],
]);

// ─── TIER 3: RARE (~1/128 to ~1/1000) ─────────────────────────────────────────
export const RARE_ITEMS: ScavengerItem[] = items("rare", [
  // Slayer boss drops
  [4151, "Abyssal whip"],
  [13265, "Abyssal dagger"],
  [11907, "Trident of the seas (full)"],
  [12004, "Kraken tentacle"],
  [12002, "Occult necklace"],
  [19529, "Zenyte shard"],

  // Zulrah
  [12924, "Toxic blowpipe (empty)"],
  [12932, "Serpentine visage"],
  [12922, "Tanzanite fang"],
  [12932, "Magic fang"],

  // Hydra
  [22983, "Hydra leather"],
  [22966, "Hydra's claw"],

  // Cerberus
  [13227, "Primordial crystal"],
  [13229, "Pegasian crystal"],
  [13231, "Eternal crystal"],
  [13233, "Smouldering stone"],

  // Wilderness bosses
  [12601, "Ring of the gods"],
  [12605, "Treasonous ring"],
  [12603, "Tyrannical ring"],

  // Misc boss drops
  [11791, "Staff of the dead"],
  [11824, "Zamorakian spear"],
  [11789, "Steam battlestaff"],
  [11920, "Dragon hunter crossbow"],
  [11286, "Draconic visage"],
  [22006, "Skeletal visage"],
  [21637, "Wyvern visage"],
  [24271, "Neitiznot faceguard"],
  [6571, "Uncut onyx"],

  // Nightmare
  [24422, "Inquisitor's great helm"],
  [24420, "Inquisitor's hauberk"],
  [24418, "Inquisitor's plateskirt"],
  [24424, "Nightmare staff"],
  [24511, "Harmonised orb"],
  [24514, "Volatile orb"],
  [24517, "Eldritch orb"],

  // CoX drops (non-ultra)
  [21003, "Elder maul"],
  [20784, "Dragon claws"],
  [21043, "Kodai insignia"],
  [21000, "Twisted buckler"],
  [22978, "Dragon hunter lance"],
  [21015, "Dexterous prayer scroll"],
  [21034, "Arcane prayer scroll"],

  // Jars (collector items)
  [13245, "Jar of souls"],
  [12007, "Jar of dirt"],
  [13200, "Jar of stone"],
  [12936, "Jar of swamp"],
  [19701, "Jar of darkness"],
  [23064, "Jar of chemicals"],
  [13248, "Jar of miasma"],
  [23526, "Jar of eyes"],

  // ToB drops (non-ultra)
  [22324, "Ghrazi rapier"],
  [22477, "Avernic defender hilt"],
  [22326, "Justiciar faceguard"],
  [22327, "Justiciar chestguard"],
  [22328, "Justiciar legguards"],
]);

// ─── ULTRA RARE (1/1000+ or equivalent) ───────────────────────────────────────
export const ULTRA_RARE_ITEMS: ScavengerItem[] = items("ultra_rare", [
  // God Wars Dungeon
  [11832, "Bandos chestplate"],
  [11834, "Bandos tassets"],
  [11836, "Bandos boots"],
  [11826, "Armadyl helmet"],
  [11828, "Armadyl chestplate"],
  [11830, "Armadyl chainskirt"],
  [11838, "Saradomin sword"],
  [13256, "Saradomin's light"],
  [11785, "Armadyl crossbow"],
  [11818, "Godsword shard 1"],
  [11820, "Godsword shard 2"],
  [11822, "Godsword shard 3"],
  [11810, "Saradomin hilt"],
  [11812, "Zamorak hilt"],
  [11814, "Bandos hilt"],
  [11816, "Armadyl hilt"],

  // Chambers of Xeric
  [20997, "Twisted bow"],
  [21021, "Ancestral hat"],
  [21024, "Ancestral robe top"],
  [21027, "Ancestral robe bottom"],

  // Theatre of Blood
  [22486, "Scythe of vitur (uncharged)"],
  [22481, "Sanguinesti staff (uncharged)"],

  // Tombs of Amascut
  [27277, "Tumeken's shadow (uncharged)"],
  [27235, "Masori mask"],
  [27238, "Masori body"],
  [27241, "Masori chaps"],
  [25975, "Lightbearer"],
  [27251, "Elidinis' ward"],
  [26219, "Osmumten's fang"],

  // Nex
  [26382, "Torva full helm"],
  [26384, "Torva platebody"],
  [26386, "Torva platelegs"],
  [26374, "Zaryte crossbow"],

  // Corporeal Beast
  [12817, "Elysian sigil"],
  [12823, "Spectral sigil"],
  [12825, "Arcane sigil"],
  [11819, "Divine sigil"],
]);

// ─── Aggregate exports ────────────────────────────────────────────────────────

export const ALL_ITEMS: ScavengerItem[] = [
  ...FREE_ITEMS,
  ...COMMON_ITEMS,
  ...UNCOMMON_ITEMS,
  ...RARE_ITEMS,
  ...ULTRA_RARE_ITEMS,
];

/** Lookup item by ID */
export const ITEM_BY_ID = new Map<number, ScavengerItem>(
  ALL_ITEMS.map((item) => [item.id, item])
);

/** Lookup item by name (lowercase) */
export const ITEM_BY_NAME = new Map<string, ScavengerItem>(
  ALL_ITEMS.map((item) => [item.name.toLowerCase(), item])
);

/**
 * Board composition:
 * 10 Common + 10 Uncommon + 4 Rare + 1 Free Space = 25 tiles
 */
export const BOARD_COMPOSITION: Record<DifficultyTier, number> = {
  free: 1,
  common: 10,
  uncommon: 10,
  rare: 4,
  ultra_rare: 0, // ultra rares not on main board (future expansion)
};

export const BOARD_SIZE = 25; // 5x5 grid
