import "server-only";
import { getStore } from "./store";
import type {
  Difficulty,
  EnemyDrops,
  Episode,
  ItemDropsByDifficulty,
} from "./types";

export async function getDropsByDifficulty(
  difficulty: Difficulty,
): Promise<EnemyDrops[]> {
  const store = await getStore();
  return store.byDifficulty.get(difficulty) ?? [];
}

export async function getEnemyDrops(
  difficulty: Difficulty,
  enemySlug: string,
  episode?: Episode,
): Promise<EnemyDrops[]> {
  const store = await getStore();
  const list = store.byEnemy.get(`${difficulty}:${enemySlug}`) ?? [];
  return episode ? list.filter((e) => e.episode === episode) : list;
}

export async function getItemDrops(
  itemSlug: string,
): Promise<ItemDropsByDifficulty> {
  const store = await getStore();
  return (
    store.byItem.get(itemSlug) ?? { normal: [], hard: [], vh: [], ultimate: [] }
  );
}

export function getWeaponDrops(weaponSlug: string) {
  return getItemDrops(
    weaponSlug.startsWith("weapons/") ? weaponSlug : `weapons/${weaponSlug}`,
  );
}