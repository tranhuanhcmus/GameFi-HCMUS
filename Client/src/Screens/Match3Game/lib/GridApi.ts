import { ROW, COLUMN } from "./spec";
import { TileDataType } from "./TileData";
import { ImageObjType } from "./Images";
import { Dimensions } from "react-native";

let Window = Dimensions.get("window");
let windowSpan = Math.min(Window.width, Window.height);
export const TILE_WIDTH = windowSpan / 8;

export const findMoves = (tileData: TileDataType[][]) => {
  const copy = tileData.slice();
  let canMove = false;

  for (var i = 0; i < COLUMN; i++) {
    for (var j = 0; j < ROW - 1; j++) {
      const swapStarter = copy[j][i];
      const swapEnder = copy[j + 1][i];
      copy[j][i] = swapEnder;
      copy[j + 1][i] = swapStarter;
      if (getAllMatches(copy).length > 0) {
        canMove = true;
      }
      copy[j][i] = swapStarter;
      copy[j + 1][i] = swapEnder;
    }
  }

  for (var i = 0; i < ROW; i++) {
    for (var j = 0; j < COLUMN - 1; j++) {
      const swapStarter = copy[i][j];
      const swapEnder = copy[i][j + 1];
      copy[i][j] = swapEnder;
      copy[i][j + 1] = swapStarter;
      if (getAllMatches(copy).length > 0) {
        canMove = true;
      }
      copy[i][j] = swapStarter;
      copy[i][j + 1] = swapEnder;
    }
  }

  return canMove;
};

export const flattenArrayToPairs = (arr: any): number[] => {
  let flatterArray: number[] = [];

  arr.map((row: any) => {
    row.map((e: any) => {
      flatterArray.push(e);
    });
  });

  if (Array.isArray(flatterArray[0]) === false) {
    return arr as number[];
  }

  return flattenArrayToPairs(flatterArray);
};

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const isMatch = (
  objOne: ImageObjType | null,
  objTwo: ImageObjType | null,
) => {
  if (objOne != null && objTwo != null) {
    if (objOne.image === objTwo.image) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const checkRowsForMatch = (tileData: TileDataType[][]) => {
  let matches: number[][][] = [];

  for (var j = 0; j < COLUMN; j++) {
    let firstIndex = [0, j];
    let potentialMatch = [firstIndex];
    let currentImageObj = tileData[0][j].imgObj;

    for (var i = 0; i < ROW; i++) {
      let nextTileObj = i + 1 < ROW ? tileData[i + 1][j].imgObj : null;

      if (isMatch(currentImageObj, nextTileObj)) {
        potentialMatch.push([i + 1, j]);
      } else {
        if (potentialMatch.length >= 3) {
          matches.push(potentialMatch);
        }
        firstIndex = [i + 1, j];
        potentialMatch = [firstIndex];
        currentImageObj = i + 1 < ROW ? tileData[i + 1][j].imgObj : null;
      }
    }
  }
  return matches;
};

export const checkColsForMatch = (tileData: TileDataType[][]) => {
  let matches: number[][][] = [];

  for (var i = 0; i < ROW; i++) {
    let firstIndex = [i, 0];
    let potentialMatch = [firstIndex];
    let currentImageObj = tileData[i][0].imgObj;

    for (var j = 0; j < COLUMN; j++) {
      let nextTileObj = j + 1 < COLUMN ? tileData[i][j + 1].imgObj : null;

      if (isMatch(currentImageObj, nextTileObj)) {
        potentialMatch.push([i, j + 1]);
      } else {
        if (potentialMatch.length >= 3) {
          matches.push(potentialMatch);
        }

        firstIndex = [i, j + 1];

        potentialMatch = [firstIndex];

        currentImageObj = j + 1 < COLUMN ? tileData[i][j + 1].imgObj : null;
      }
    }
  }

  return matches;
};

export const getAllMatches = (tileData: TileDataType[][]) => {
  let rowMatches = checkRowsForMatch(tileData);
  let colMatches = checkColsForMatch(tileData);

  return [...rowMatches, ...colMatches];
};

export const markAsMatch = (
  matches: number[][][],
  tileData: TileDataType[][],
) => {
  matches.forEach((match) => {
    match.forEach((e) => {
      let i = e[0];
      let j = e[1];
      tileData[i][j].markedAsMatch = true;
    });
  });
};

export const condenseColumns = (tileData: TileDataType[][]) => {
  let numOfRows = tileData.length;
  let numOfCols = tileData[0].length;

  let spotsToFill = 0;

  for (let i = 0; i < numOfRows; i++) {
    spotsToFill = 0;

    for (let j = numOfCols - 1; j >= 0; j--) {
      if (tileData[i][j].markedAsMatch === true) {
        spotsToFill++;

        tileData[i][j].location.setValue({
          x: TILE_WIDTH * i,
          y: -COLUMN * 2 * TILE_WIDTH,
        });
      } else if (spotsToFill > 0) {
        const currentSpot = tileData[i][j];
        const newSpot = tileData[i][j + spotsToFill];

        tileData[i][j] = newSpot;
        tileData[i][j + spotsToFill] = currentSpot;
      }
    }
  }
};

export const sleep = (ms: number) => {
  return new Promise((r) => setTimeout(r, ms));
};
