/**
 * @author: duy-nhan
 */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Animated } from "react-native";
import GameLogic from "../utils/game/game";

interface BoardState {
  size: any;
  // scoreOpacity: Animated.Value[][];
  effects: any;
  blockList: {
    startCell: { i: number; j: number };
    endCell: { i: number; j: number };
  }[];
  position: any;
  table: any;
  number: any;
}

const initialState: BoardState = {
  size: {
    CELLS_IN_ROW: 8,
    CELLS_IN_COLUMN: 8,
    WIDTH_PER_CELL: GameLogic.SIZE_TABLE / 8,
    HEIGHT_PER_CELL: GameLogic.SIZE_TABLE / 8,
    MARGIN: 3,
    CELL_SPACING: 3,
  },
  position: {
    top: 100,
    left: 15,
  },
  table: [
    [1, 4, 3, 2, 0, 1, 3, 2],
    [2, 3, 1, 4, 0, 2, 1, 3],
    [0, 4, 1, 2, 3, 0, 2, 4],
    [3, 2, 2, 0, 4, 3, 2, 1],
    [0, 2, 4, 2, 1, 2, 3, 0],
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
  number: 0,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    // SET BLOCKLIST FOR STATE
    updateBlockList(state, action) {
      state.blockList = action.payload;

      return state;
    },

    // SET BLOCKLIST FOR STATE
    emptyBlockList(state, action) {
      state.blockList = []; // Update blockList directly on state
      return state;
    },

    updateTable(state, action) {
      state.table = [];
      state.table = action.payload; // BUG CAN NOT UPDATE STATE
      return state;
    },

    increaseNumber(state, action) {
      state.number++;
      return state;
    },
    generateRandomMatrix(state) {
      const matrix: number[][] = [];
      for (let i = 0; i < GameLogic.CELLS_IN_ROW; i++) {
        matrix.push([]);
        for (let j = 0; j < GameLogic.CELLS_IN_COLUMN; j++) {
          matrix[i].push(Math.floor(Math.random() * 5));
        }
      }
      state.table = matrix;
      return state;
    },
  },
});

export { boardSlice };
export const {
  updateBlockList,
  updateTable,
  emptyBlockList,
  generateRandomMatrix,
} = boardSlice.actions;

export const selectLoading = (state: RootState) => state.loading;

export default boardSlice.reducer;
