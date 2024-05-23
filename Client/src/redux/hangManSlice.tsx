import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Animated } from "react-native";
import GameLogic from "../utils/game/game";
import log from "../logger/index.js";
interface hangManState {
  turn: any;
  damage: any;
}

const initialState: hangManState = {
  turn: false,
  damage: null,
};

const hangManSlice = createSlice({
  name: "hangMan",
  initialState,
  reducers: {
    updateTurn(state, action) {
      state.turn = action.payload;
    },
    swapTurn(state) {
      state.turn = !state.turn;
    },

    updateDamage(state, action) {
      state.damage = action.payload;
      return state;
    },
  },
});

export { hangManSlice };
export const { updateTurn, updateDamage, swapTurn } = hangManSlice.actions;

export default hangManSlice.reducer;
