"use server";

import {
  getDropsByDifficulty,
  getEnemyDrops,
  getWeaponDrops,
} from "@/src/lib/drops/queries";
import {
  DIFFICULTIES,
  EPISODES,
  type Difficulty,
  type Episode,
} from "@/src/lib/drops/types";

function parseDifficulty(value: unknown): Difficulty {
  if (!DIFFICULTIES.includes(value as Difficulty)) {
    throw new Error(`Difficulté invalide: ${String(value)}`);
  }
  return value as Difficulty;
}

function parseEpisode(value: unknown): Episode | undefined {
  if (value === undefined || value === null) return undefined;
  if (!EPISODES.includes(value as Episode)) {
    throw new Error(`Épisode invalide: ${String(value)}`);
  }
  return value as Episode;
}

function parseSlug(value: unknown): string {
  if (typeof value !== "string" || !/^[a-z0-9/-]{1,100}$/.test(value)) {
    throw new Error("Slug invalide");
  }
  return value;
}

export async function fetchDropsByDifficulty(difficulty: string) {
  return getDropsByDifficulty(parseDifficulty(difficulty));
}

export async function fetchEnemyDrops(
  difficulty: string,
  enemySlug: string,
  episode?: string,
) {
  return getEnemyDrops(
    parseDifficulty(difficulty),
    parseSlug(enemySlug),
    parseEpisode(episode),
  );
}

export async function fetchWeaponDrops(weaponSlug: string) {
  return getWeaponDrops(parseSlug(weaponSlug));
}