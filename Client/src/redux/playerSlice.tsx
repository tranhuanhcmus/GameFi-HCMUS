import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Animated } from "react-native";
import GameLogic from "../utils/game/game";

interface PlayerState {
  energy: number;
  hp: any;
  componentHp: any;

  atkOpponent: number;
  elementOpponent: number;
  gameRoom: any;
  assets: string;
  isComponentTurn: any;
}

const initialState: PlayerState = {
  energy: 0,
  atkOpponent: 0,
  elementOpponent: 0,
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
    updateEnergy(state, action) {
      state.energy = action.payload;
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

    setOpponentValue(state, action) {
      state.componentHp = action.payload.hpOpponent;
      state.assets = action.payload.assetsOpponent;
      state.elementOpponent = action.payload.elementOpponent;
      state.atkOpponent = action.payload.atkOpponent;
    },
  },
});

export { playerSlice };
export const {
  updateHp,
  updateComponentHp,
  updateEnergy,
  setOpponentValue,
  setAssets,
  setHp,
  setComponentHp,
  setGameRoom,
  updateComponentTurn,
} = playerSlice.actions;

export const selectLoading = (state: RootState) => state.loading;

export default playerSlice.reducer;
