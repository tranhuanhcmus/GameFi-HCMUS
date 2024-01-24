import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import alertSlice from "./alertSlice";
import loadingSlice from "./loadingSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    users: userSlice,
    alert: alertSlice,
    loading: loadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;