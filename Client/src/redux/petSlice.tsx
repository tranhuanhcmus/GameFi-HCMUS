import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface PetState {
  name: string;
  type: string;
  image: string;
  title: string;
  active: boolean;
  tokenId: String;
  level: number;
  attributes: {
    element: string;
    eye: string;
    fur: string;
    item: string;
  };
}

const initialState: PetState = {
  name: "",
  type: "",
  image: "",
  title: "",
  active: false,
  tokenId: "",
  level: 0,
  attributes: {
    element: "",
    eye: "",
    fur: "",
    item: "",
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
      state.active = attribute.active;
      state.image = attribute.image;
      state.title = attribute.title;
      state.tokenId = attribute.tokenId;
      state.attributes.element = attribute.attributes.element;
      state.attributes.eye = attribute.attributes.eye;
      state.attributes.fur = attribute.attributes.fur;
      state.attributes.item = attribute.attributes.item;
    },
  },
});

export const { updatePet } = petSlice.actions;

export default petSlice.reducer;
