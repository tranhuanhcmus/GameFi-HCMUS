import { ELEMENT, formatElement } from "../constants/types";

// Define the elemental strengths and weaknesses
export const elementalRelations: {
  [key: string]: { strongAgainst: string[]; weakAgainst: string[] };
} = {
  [ELEMENT.FIRE]: {
    strongAgainst: [ELEMENT.FOREST],
    weakAgainst: [ELEMENT.WATER],
  },
  [ELEMENT.WATER]: {
    strongAgainst: [ELEMENT.FIRE],
    weakAgainst: [ELEMENT.THUNDER],
  },
  [ELEMENT.FOREST]: {
    strongAgainst: [ELEMENT.WATER],
    weakAgainst: [ELEMENT.FIRE],
  },
  [ELEMENT.FROZEN]: {
    strongAgainst: [ELEMENT.THUNDER],
    weakAgainst: [ELEMENT.FIRE],
  },
  [ELEMENT.THUNDER]: {
    strongAgainst: [ELEMENT.FROZEN],
    weakAgainst: [ELEMENT.FOREST],
  },
  [ELEMENT.DARK]: {
    strongAgainst: [ELEMENT.FOREST],
    weakAgainst: [ELEMENT.THUNDER],
  },
};
export const ContraryElement = (
  element: number,
  opponentElement: number,
): number => {
  const elementStr = formatElement(element);
  const opponentElementStr = formatElement(opponentElement);

  const elementRelation = elementalRelations[elementStr];

  if (elementRelation.strongAgainst.includes(opponentElementStr)) {
    return 1.2;
  } else if (elementRelation.weakAgainst.includes(opponentElementStr)) {
    return 0.8;
  } else {
    return 1;
  }
};
