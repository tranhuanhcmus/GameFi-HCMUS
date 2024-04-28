import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import alertSlice from "./alertSlice";
import loadingSlice from "./loadingSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import boardSlice from "./boardSlice";
import upperLayerSlice from "./uppLayerSlice";
import playerSlice from "./playerSlice";
import socketSlice from "./socketSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    alert: alertSlice,
    loading: loadingSlice,
    board: boardSlice,
    upperLayer: upperLayerSlice,
    player: playerSlice,
    socket: socketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
