import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface PetState {
  name: string;
  type: string;
  image: string;
  title: string;
  tokenId: String;
  level: number;
  attributes: {
    type: String;
  };
}

const initialState: PetState = {
  name: "",
  type: "",
  image: "",
  title: "",
  tokenId: "",
  level: 0,
  attributes: {
    type: "",
  },
};

const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    updatePet(state, action) {
      const attribute = action.payload;
      state.name = attribute.name;
      state.type = attribute.type;
      state.image = attribute.image;
      state.title = attribute.title;
      state.tokenId = attribute.tokenId;
      state.attributes.type = attribute.attributes.type;
    },
  },
});

export const {} = petSlice.actions;

export const selectAlert = (state: RootState) => state.alert;

export default petSlice.reducer;
