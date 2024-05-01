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
  move: any;
  tableSocket: any[];
}

const initialState: SocketState = {
  socket: null,
  move: {},
  tableSocket: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    initSocket(state) {
      state.socket = SocketIOClient.getInstance();
      return state;
    },

    updateMove(state, action) {
      state.move = action.payload;
      return state;
    },

    updateTableSocket(state, action) {
      state.tableSocket = action.payload;
      return state;
    },
  },
});

export { socketSlice };
export const { initSocket, updateMove, updateTableSocket } =
  socketSlice.actions;

export const selectLoading = (state: RootState) => state.loading;

export default socketSlice.reducer;
