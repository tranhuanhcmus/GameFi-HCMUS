import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface homeState {
  name: string;
  type: string;
  image: string;
  title: string;

  tokenId: String;
  level: number;
  attributes: {
    element: string;
    eye: string;
    fur: string;
    item: string;
  };
}

const initialState: homeState = {
  name: "",
  type: "",
  image: "",
  title: "",

  tokenId: "",
  level: 0,
  attributes: {
    element: "",
    eye: "",
    fur: "",
    item: "",
  },
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    updatehome(state, action) {
      const attribute = action.payload;
      state.name = attribute.name;
      state.type = attribute.type;

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

export const { updatehome } = homeSlice.actions;

export default homeSlice.reducer;
