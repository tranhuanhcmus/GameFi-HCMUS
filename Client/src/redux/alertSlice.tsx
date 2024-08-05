import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AlertState {
  title: string | null;
  message: {
    error: true;
    message: "";
  };
  isVisible: boolean;
}

const initialState: AlertState = {
  title: null,
  message: {
    error: true,
    message: "",
  },
  isVisible: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.isVisible = true;
    },
    hideAlert: (state) => {
      state.title = null;
      state.message = {
        error: true,
        message: "",
      };
      state.isVisible = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export const selectAlert = (state: RootState) => state.alert;

export default alertSlice.reducer;
