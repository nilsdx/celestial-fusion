export const DIFFICULTIES = ["normal", "hard", "vh", "ultimate"] as const;
export const EPISODES = ["ep1", "ep2", "ep4"] as const;
export const SECTION_IDS = [
  "Viridia",
  "Greenill",
  "Skyly",
  "Bluefull",
  "Purplenum",
  "Pinkal",
  "Redria",
  "Oran",
  "Yellowboze",
  "Whitill",
] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];
export type Episode = (typeof EPISODES)[number];
export type SectionId = (typeof SECTION_IDS)[number];

export interface RawDrop {
  "item-slug": string;
  "item-display": string;
  rate: number | null;
}
export interface RawEnemy {
  "enemy-slug": string;
  "enemy-display": string;
  dar: number | null;
  drops: RawDrop[];
}

export interface Drop {
  sectionId: SectionId;
  itemSlug: string;
  itemDisplay: string;
  rate: number | null;
}

export interface EnemyDrops {
  difficulty: Difficulty;
  episode: Episode;
  enemySlug: string;
  enemyDisplay: string;
  dar: number | null;
  drops: Drop[]
}

export interface ItemDropSource {
  difficulty: Difficulty;
  episode: Episode;
  sectionId: SectionId;
  enemySlug: string;
  enemyDisplay: string;
  dar: number | null;
  rate: number | null;
}

export type ItemDropsByDifficulty = Record<Difficulty, ItemDropSource[]>;