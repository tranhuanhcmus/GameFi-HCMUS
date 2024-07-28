import { ELEMENT, formatElement } from "../constants/types";

export const contraryPairs: { [key: string]: string } = {
  [ELEMENT.FIRE]: ELEMENT.WATER,
  [ELEMENT.WATER]: ELEMENT.FIRE,
  [ELEMENT.FOREST]: ELEMENT.FIRE,
  [ELEMENT.FROZEN]: ELEMENT.THUNDER,
  [ELEMENT.THUNDER]: ELEMENT.FROZEN,
  [ELEMENT.DARK]: ELEMENT.FOREST,
  [ELEMENT.FOREST]: ELEMENT.DARK,
};

export const ContraryElement = (element: number, elementOpponent: number) => {
  const elementStr = formatElement(element);
  const elementOpponentStr = formatElement(elementOpponent);

  if (contraryPairs[elementStr] === elementOpponentStr) {
    return 0.8;
  } else if (contraryPairs[elementOpponentStr] === elementStr) {
    return 1.2;
  } else {
    return 1;
  }
};
