/**
 * @author: duy-nhan
 */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Animated } from "react-native";
import GameLogic from "../utils/game/game";
import log from "../logger/index.js";
interface BoardState {
  blockList: {
    startCell: { i: number; j: number };
    endCell: { i: number; j: number };
  }[];
  position: any;
  table: any;
  number: any;
  turn: any;
  damage: any;
  swapCells: {
    startCell: { row: number; column: number };
    endCell: { row: number; column: number };
  };
}

const initialState: BoardState = {
  position: {
    top: 100,
    left: 15,
  },
  table: [
    [1, 2, 3, 2, 0, 1, 3, 2],
    [2, 3, 2, 4, 0, 2, 1, 3],
    [0, 4, 1, 2, 3, 0, 2, 4],
    [3, 2, 2, 0, 4, 3, 2, 1],
    [0, 2, 4, 2, 1, 2, 4, 0],
    [1, 3, 2, 0, 4, 1, 0, 3],
    [4, 2, 3, 1, 0, 4, 2, 1],
    [3, 1, 4, 0, 2, 3, 1, 4],
  ],
  turn: 1,
  damage: 0,
  blockList: [],
  number: 0,
  swapCells: {
    startCell: {
      row: 0,
      column: 0,
    },
    endCell: {
      row: 0,
      column: 0,
    },
  },
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

    emptyBlockList(state, action) {
      state.blockList = [];
      return state;
    },

    updateTable(state, action) {
      state.table = [];
      state.table = action.payload;
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

    updateTurn(state, action) {
      state.turn = action.payload;
      return state;
    },

    updateDamage(state, action) {
      state.damage = action.payload;
      return state;
    },

    updateCellsToSwap(state, action) {
      state.swapCells = action.payload;
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
  updateTurn,
  updateDamage,
  updateCellsToSwap,
} = boardSlice.actions;

export const selectLoading = (state: RootState) => state.loading;

export default boardSlice.reducer;
