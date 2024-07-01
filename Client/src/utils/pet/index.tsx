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

export function calculateEnergy(lastTimeUpdated: string) {
  // Get the current time in milliseconds
  const now = new Date().getTime();

  // Parse the lastTimeUpdated string into a Date object
  const lastTimeUpdatedDate = new Date(lastTimeUpdated);

  // Calculate the time difference in milliseconds
  const timeDiff = now - lastTimeUpdatedDate.getTime();

  // Convert time difference to minutes
  const timeDiffInMinutes = timeDiff / (1000 * 60);

  // Determine the number of energy units based on time difference
  let energyUnits = 0;
  if (timeDiffInMinutes >= 15) {
    energyUnits = 3;
  } else if (timeDiffInMinutes >= 10) {
    energyUnits = 2;
  } else if (timeDiffInMinutes >= 5) {
    energyUnits = 1;
  }

  return energyUnits;
}
