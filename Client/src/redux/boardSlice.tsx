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
  size: any;
  // scoreOpacity: Animated.Value[][];
  cells: any[];
  effects: any;
  blockList: {
    startCell: { i: number; j: number };
    endCell: { i: number; j: number };
  }[];
  position: any;
  table: any;
}

const initialState: BoardState = {
  size: {
    CELLS_IN_ROW: 8,
    CELLS_IN_COLUMN: 8,
    WIDTH_PER_CELL: SIZE_TABLE / 8,
    HEIGHT_PER_CELL: SIZE_TABLE / 8,
    MARGIN: 3,
    CELL_SPACING: 3,
  },
  position: {
    top: 100,
    left: 15,
  },
  cells: [
    [1, 4, 3, 2, 0, 1, 3, 2],
    [2, 3, 1, 4, 0, 2, 1, 3],
    [0, 4, 1, 2, 3, 0, 2, 4],
    [3, 2, 3, 0, 4, 3, 2, 1],
    [0, 2, 4, 3, 1, 2, 3, 0],
    [1, 3, 2, 0, 4, 1, 0, 3],
    [4, 2, 3, 1, 0, 4, 2, 1],
    [3, 1, 4, 0, 2, 3, 1, 4],
  ],
  table: [
    [1, 4, 3, 2, 0, 1, 3, 2],
    [2, 3, 1, 4, 0, 2, 1, 3],
    [0, 4, 1, 2, 3, 0, 2, 4],
    [3, 2, 1, 0, 4, 3, 2, 1],
    [0, 2, 4, 3, 1, 2, 3, 0],
    [1, 3, 2, 0, 4, 1, 0, 3],
    [4, 2, 3, 1, 0, 4, 2, 1],
    [3, 1, 4, 0, 2, 3, 1, 4],
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

  blockList: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    // SET BLOCKLIST FOR STATE
    updateBlockList(state, action) {
      state.blockList = action.payload; // Update blockList directly on state
      return state;
    },

    // SET BLOCKLIST FOR STATE
    emptyBlockList(state, action) {
      state.blockList = []; // Update blockList directly on state
      console.log("======================================");
      console.log("emptyBlockList", state.blockList);

      return state;
    },

    swap2Cells(state, action) {
      let temp = state.cells[action.payload.row1][action.payload.col1];
      state.cells[action.payload.row1][action.payload.col1] =
        state.cells[action.payload.row2][action.payload.col2];
      state.cells[action.payload.row2][action.payload.col2] = temp;

      console.log("cells ", state.cells);

      return state;
    },

    updateTable(state, action) {
      state.table = action.payload;
      console.log("===============================");
      console.log("update table ", state.table);

      return state;
    },
  },
});

export { boardSlice };
export const { updateBlockList, updateTable, swap2Cells, emptyBlockList } =
  boardSlice.actions;

export const selectLoading = (state: RootState) => state.loading;

export default boardSlice.reducer;
