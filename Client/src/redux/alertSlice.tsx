import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AlertState {
  message: string | null;
  isVisible: boolean;
}

const initialState: AlertState = {
  message: null,
  isVisible: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.isVisible = true;
    },
    hideAlert: (state) => {
      state.message = null;
      state.isVisible = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export const selectAlert = (state: RootState) => state.alert;

export default alertSlice.reducer;
