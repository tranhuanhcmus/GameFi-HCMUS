export function getLevel(exp: number) {
  let constant = 100;
  let level = 0;
  while (exp > 0) {
    let increase_level_exp_require = (level + 1) * constant;
    let remaining_exp = exp - increase_level_exp_require;
    let increase_level = 0;
    if (remaining_exp > 0) {
      increase_level = 1;
    } else {
      increase_level =
        (remaining_exp + increase_level_exp_require) /
        increase_level_exp_require;
    }
    level += increase_level;
    exp = remaining_exp;
  }
  return level;
}
