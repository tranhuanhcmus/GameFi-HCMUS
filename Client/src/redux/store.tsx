import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import alertSlice from "./alertSlice";
import loadingSlice from "./loadingSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import boardSlice from "./boardSlice";
import upperLayerSlice from "./uppLayerSlice";
import playerSlice from "./playerSlice";
import socketSlice from "./socketSlice";
import hangManSlice from "./hangManSlice";
import settingGameSlice from "./settingGameSlice";
import breedSlice from "./breedSlice";
import petSlice from "./petSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    alert: alertSlice,
    loading: loadingSlice,
    board: boardSlice,
    upperLayer: upperLayerSlice,
    hangMan: hangManSlice,
    player: playerSlice,
    settingGame: settingGameSlice,
    socket: socketSlice,
    breed: breedSlice,
    pet: petSlice,
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
