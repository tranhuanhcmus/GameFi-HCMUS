/**
 * @author: duy-nhan
 */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Animated } from "react-native";

/**
 * Function to generate 2D Matrix Animated.Value
 * @param value
 * @param CELLS_IN_ROW
 * @param CELLS_IN_COLUMN
 * @returns
 */
const generateAnimatedValue = (
  value: number,
  CELLS_IN_ROW = 8,
  CELLS_IN_COLUMN = 8,
) => {
  const animation = Array(CELLS_IN_COLUMN);
  for (let i = 0; i < CELLS_IN_COLUMN; i++) {
    animation[i] = new Array(CELLS_IN_ROW);
    for (let j = 0; j < CELLS_IN_ROW; j++) {
      animation[i][j] = new Animated.Value(value);
    }
  }
  return animation;
};

const generateAnimatedValueXY = (
  // value: number,
  CELLS_IN_ROW = 8,
  CELLS_IN_COLUMN = 8,
) => {
  const animation = Array(CELLS_IN_COLUMN);
  for (let i = 0; i < CELLS_IN_COLUMN; i++) {
    animation[i] = new Array(CELLS_IN_ROW);
    for (let j = 0; j < CELLS_IN_ROW; j++) {
      animation[i][j] = new Animated.ValueXY();
    }
  }
  return animation;
};

const SIZE_TABLE = 280;
interface BoardState {
  backgroundColor: any;
  borderColor: any;
  zIndex: any;
  coordinate: any;
  rotation: any;
  scale: any;
  size: any;
  cells: any[];
  effects: any;
}

const initialState: BoardState = {
  backgroundColor: generateAnimatedValue(-1),
  borderColor: generateAnimatedValue(0),
  zIndex: generateAnimatedValue(0),
  rotation: generateAnimatedValue(0),
  coordinate: generateAnimatedValueXY(),
  scale: generateAnimatedValue(0),
  size: {
    CELLS_IN_ROW: 8,
    CELLS_IN_COLUMN: 8,
    WIDTH_PER_CELL: SIZE_TABLE / 8,
    MARGIN: 3,
  },
  cells: [
    [0, 1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30, 31],
    [32, 33, 34, 35, 36, 37, 38, 39],
    [40, 41, 42, 43, 44, 45, 46, 47],
    [48, 49, 50, 51, 52, 53, 54, 55],
    [56, 57, 58, 59, 60, 61, 62, 63],
  ],
  effects: {
    doubleScore: {
      status: false,
      count: 0,
    },
    destroyOneCell: {
      status: null, // null - no, true - pending to choose 1 cell, 2 - { x: 0, y: 0 } - coords of cell to destroy
      count: 0,
    },
    resetBoard: {
      count: 0,
    },
    findWord: {
      count: 0,
    },
  },
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
});

export { boardSlice };
export const {} = boardSlice.actions;

export const selectLoading = (state: RootState) => state.loading;

export default boardSlice.reducer;
