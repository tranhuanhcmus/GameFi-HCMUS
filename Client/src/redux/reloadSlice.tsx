import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ReLoadState {
  reLoad: boolean;
}

const initialState: ReLoadState = {
  reLoad: false,
};

const reLoadSlice = createSlice({
  name: "reLoad",
  initialState,
  reducers: {
    setReLoad(state) {
      state.reLoad = !state.reLoad;
    },
  },
});

export const { setReLoad } = reLoadSlice.actions;

export const selectReLoad = (state: RootState) => state.alert;

export default reLoadSlice.reducer;
