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
  CELLS_IN_ROW = 10,
  CELLS_IN_COLUMN = 10,
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

interface BoardState {
  backgroundColor: any;
  zIndex: any;
  rotation: any;
  scale: any;
}

const initialState: BoardState = {
  backgroundColor: generateAnimatedValue(0),
  zIndex: generateAnimatedValue(0),
  rotation: generateAnimatedValue(0),
  scale: generateAnimatedValue(0),
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
