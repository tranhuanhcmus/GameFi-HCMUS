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
  assets: string;
  isComponentTurn: any;
}

const initialState: PlayerState = {
  hp: GameLogic.HEALTH_POINT,
  componentHp: GameLogic.HEALTH_POINT,
  assets: "",
  gameRoom: "",
  isComponentTurn: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    updateHp(state, action) {
      state.hp = state.hp - action.payload;
      return state;
    },
    setAssets(state, action) {
      state.assets = action.payload;
      return state;
    },

    setHp(state, action) {
      state.hp = action.payload;
      return state;
    },

    setGameRoom(state, action) {
      state.gameRoom = action.payload;
    },

    updateComponentHp(state, action) {
      state.componentHp = state.componentHp - action.payload;
      return state;
    },
    setComponentHp(state, action) {
      state.componentHp = action.payload;
      return state;
    },

    updateComponentTurn(state, action) {
      state.isComponentTurn = action.payload;
      return state;
    },
  },
});

export { playerSlice };
export const {
  updateHp,
  updateComponentHp,
  setAssets,
  setHp,
  setComponentHp,
  setGameRoom,
  updateComponentTurn,
} = playerSlice.actions;

export const selectLoading = (state: RootState) => state.loading;

export default playerSlice.reducer;
