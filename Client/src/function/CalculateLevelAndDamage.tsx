import { getLevel } from "../utils/pet";

const hpScaleFactor = 1.1; // 10% increase per level
const damageScaleFactor = 1.15; // 15% increase per level
export function scaleStats(exp: number, baseHP: number, baseDamage: number) {
  // Ensure level is at least 1
  const level = Math.floor(getLevel(exp));
  if (level < 1) {
    return {
      hp: baseHP,
      damage: baseDamage,
    };
  }

  // Calculate scaled HP and damage
  const scaledHP = baseHP * Math.pow(hpScaleFactor, level - 1);
  const scaledDamage = baseDamage * Math.pow(damageScaleFactor, level - 1);

  return {
    hp: Math.round(scaledHP),
    damage: Math.round(scaledDamage),
  };
}
