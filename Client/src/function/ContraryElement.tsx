import { formatElement } from "../constants/types";

export const contraryPairs: { [key: string]: string } = {
  fire: "water",
  water: "fire",
  leaf: "fire",
  stone: "iron",
  iron: "leaf",
};

export const ContraryElement = (element: number, elementOpponent: number) => {
  const elementStr = formatElement(element);
  const elementOpponentStr = formatElement(elementOpponent);

  if (contraryPairs[elementStr] === elementOpponentStr) {
    return 0.75;
  } else if (contraryPairs[elementOpponentStr] === elementStr) {
    return 1.25;
  } else {
    return 1;
  }
};
