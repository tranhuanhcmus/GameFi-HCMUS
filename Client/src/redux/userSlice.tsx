import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UserState {
  address: `0x${string}` | undefined;
}
const initialState: UserState = {
  address: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<typeof initialState.address>) => {
      state.address = action.payload;
    },
  },
});

export const { setAddress } = userSlice.actions;

export const selectUser = (state: RootState) => state.users;

export default userSlice.reducer;
