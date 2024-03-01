/**
 * @author: duy-nhan
 */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Animated } from "react-native";

const SIZE_TABLE = 280;

interface UpperLayerState {
  stateList: [];
  blocksValues: [];
  blockList: any;
}

const initialState: UpperLayerState = {
  stateList: [],
  blocksValues: [],
  blockList: [],
};

const upperLayerSlice = createSlice({
  name: "upperLayer",
  initialState,
  reducers: {},
});

export { upperLayerSlice };
export const {} = upperLayerSlice.actions;

export const selectLoading = (state: RootState) => state.loading;

export default upperLayerSlice.reducer;
