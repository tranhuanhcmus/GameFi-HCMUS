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
    [3, 2, 3, 0, 4, 3, 2, 1],
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
  number: 0,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    // SET BLOCKLIST FOR STATE
    updateBlockList(state, action) {
      console.log("updateBlockList action.payload", action.payload);

      state.blockList = action.payload;

      return state;
    },

    // SET BLOCKLIST FOR STATE
    emptyBlockList(state, action) {
      state.blockList = []; // Update blockList directly on state
      console.log("======================================");
      console.log("emptyBlockList", state.blockList);

      return state;
    },

    updateTable(state, action) {
      state.table = [];
      state.table = action.payload; // BUG CAN NOT UPDATE STATE

      console.log("===============================");
      const rows = 8;
      const cols = 8;

      // Iterate through each cell in the matrix
      for (let i = 0; i < rows; i++) {
        let row = "";
        for (let j = 0; j < cols; j++) {
          row = row + state.table[i][j] + " ";
        }
        console.log(row, "\n");
      }
      // state.table = action.payload.map((row: any)=> [...row])

      return state;
    },
    increaseNumber(state, action) {
      state.number++;
      return state;
    },
  },
});

export { boardSlice };
export const { updateBlockList, updateTable, emptyBlockList, increaseNumber } =
  boardSlice.actions;

export const selectLoading = (state: RootState) => state.loading;

export default boardSlice.reducer;
