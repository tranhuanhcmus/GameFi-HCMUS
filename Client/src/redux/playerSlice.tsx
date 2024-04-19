/**
 * @author: duy-nhan
 */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Animated } from "react-native";
import GameLogic from "../utils/game/game";

interface PlayerState {
  hp: any;
  componentHp: any;
  gameRoom: any;
  move: any; // Store information about component move
}

const initialState: PlayerState = {
  hp: GameLogic.HEALTH_POINT,
  componentHp: GameLogic.HEALTH_POINT,
  gameRoom: "",
  move: {},
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    updateHp(state, action) {
      state.hp = state.hp - action.payload;
      return state;
    },
    setGameRoom(state, action) {
      state.gameRoom = action.payload;
    },

    updateComponentHp(state, action) {
      state.componentHp = state.componentHp - action.payload;
      return state;
    },

    updateMove(state, action) {
      state.move = action.payload;
      return state;
    },
  },
});

export { playerSlice };
export const { updateHp, updateComponentHp, updateMove, setGameRoom } =
  playerSlice.actions;

export const selectLoading = (state: RootState) => state.loading;

export default playerSlice.reducer;
