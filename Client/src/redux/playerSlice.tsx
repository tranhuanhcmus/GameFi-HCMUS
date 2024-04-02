/**
 * @author: duy-nhan
 */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Animated } from "react-native";
import GameLogic from "../utils/game/game";

interface PlayerState {
  hp: any;
}

const initialState: PlayerState = {
  hp: 20,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    updateHp(state, action) {
      console.log("alo action", action.payload);

      state.hp = state.hp - action.payload;
      return state;
    },
  },
});

export { playerSlice };
export const { updateHp } = playerSlice.actions;

export const selectLoading = (state: RootState) => state.loading;

export default playerSlice.reducer;
