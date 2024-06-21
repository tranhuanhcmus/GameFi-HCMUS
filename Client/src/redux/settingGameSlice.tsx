import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Animated } from "react-native";
import GameLogic from "../utils/game/game";
import log from "../logger/index.js";
interface settingGameState {
  sound: boolean;
  music: boolean;
  isVisable: boolean;
}

const initialState: settingGameState = {
  sound: true,
  music: true,
  isVisable: false,
};

const settingGameSlice = createSlice({
  name: "settingGame",
  initialState,
  reducers: {
    setSound(state, action) {
      state.sound = action.payload;
    },
    setMusic(state, action) {
      state.music = action.payload;
    },
    setVisable(state, action) {
      state.isVisable = action.payload;
    },
  },
});

export { settingGameSlice };
export const { setMusic, setSound, setVisable } = settingGameSlice.actions;

export default settingGameSlice.reducer;
