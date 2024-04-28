/**
 * @author: duy-nhan
 */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Animated } from "react-native";
import GameLogic from "../utils/game/game";
import { SocketIOClient } from "../../socket";
import log from "../logger/index";
interface SocketState {
  socket: SocketIOClient | null;
}

const initialState: SocketState = {
  socket: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    initSocket(state) {
      state.socket = SocketIOClient.getInstance();
      return state;
    },

    attack(state, action) {},

    onListenTakeDamage(state, action) {},
  },
});

export { socketSlice };
export const { initSocket } = socketSlice.actions;

export const selectLoading = (state: RootState) => state.loading;

export default socketSlice.reducer;
