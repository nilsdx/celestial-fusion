import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  DIFFICULTIES,
  EPISODES,
  SECTION_IDS,
  type Difficulty,
  type EnemyDrops,
  type ItemDropsByDifficulty,
  type RawEnemy,
} from "./types";

const DROPS_DIR = path.join(process.cwd(), "data", "drops");

export interface DropsStore {
  byDifficulty: Map<Difficulty, EnemyDrops[]>;
  byEnemy: Map<string, EnemyDrops[]>;
  byItem: Map<string, ItemDropsByDifficulty>;
}

const emptyByDifficulty = (): ItemDropsByDifficulty => ({
  normal: [],
  hard: [],
  vh: [],
  ultimate: [],
});

async function load(): Promise<DropsStore> {
  const files = DIFFICULTIES.flatMap((difficulty) =>
    EPISODES.map((episode) => ({ difficulty, episode })),
  );

  const loaded = await Promise.all(
    files.map(async ({ difficulty, episode }) => {
      const file = path.join(DROPS_DIR, `${difficulty}-${episode}.json`);
      const raw = JSON.parse(await fs.readFile(file, "utf-8")) as RawEnemy[];
      return { difficulty, episode, raw };
    }),
  );

  const byDifficulty = new Map<Difficulty, EnemyDrops[]>();
  const byEnemy = new Map<string, EnemyDrops[]>();
  const byItem = new Map<string, ItemDropsByDifficulty>();

  for (const d of DIFFICULTIES) byDifficulty.set(d, []);

  for (const { difficulty, episode, raw } of loaded) {
    for (const e of raw) {
      if (e.drops.length !== SECTION_IDS.length) {
        throw new Error(
          `${difficulty}-${episode}: "${e["enemy-slug"]}" a ${e.drops.length} drops, ${SECTION_IDS.length} attendus`,
        );
      }

      const enemy: EnemyDrops = {
        difficulty,
        episode,
        enemySlug: e["enemy-slug"],
        enemyDisplay: e["enemy-display"],
        dar: e.dar,
        // L'index = le section ID. On l'attache AVANT de filtrer les cellules vides.
        drops: e.drops
          .map((d, i) => ({
            sectionId: SECTION_IDS[i],
            itemSlug: d["item-slug"],
            itemDisplay: d["item-display"],
            rate: d.rate,
          }))
          .filter((d) => d.itemSlug !== ""),
      };

      byDifficulty.get(difficulty)!.push(enemy);

      const enemyKey = `${difficulty}:${enemy.enemySlug}`;
      const list = byEnemy.get(enemyKey);
      if (list) list.push(enemy);
      else byEnemy.set(enemyKey, [enemy]);

      for (const drop of enemy.drops) {
        let entry = byItem.get(drop.itemSlug);
        if (!entry) {
          entry = emptyByDifficulty();
          byItem.set(drop.itemSlug, entry);
        }
        entry[difficulty].push({
          difficulty,
          episode,
          sectionId: drop.sectionId,
          enemySlug: enemy.enemySlug,
          enemyDisplay: enemy.enemyDisplay,
          dar: enemy.dar,
          rate: drop.rate,
        });
      }
    }
  }

  return { byDifficulty, byEnemy, byItem };
}

const g = globalThis as typeof globalThis & {
  __dropsStore?: Promise<DropsStore>;
};

export function getStore(): Promise<DropsStore> {
  if (!g.__dropsStore) {
    g.__dropsStore = load().catch((err) => {
      g.__dropsStore = undefined;
      throw err;
    });
  }
  return g.__dropsStore;
}