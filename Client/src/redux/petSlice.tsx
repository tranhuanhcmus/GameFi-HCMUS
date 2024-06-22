import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface PetState {
  name: string;
  type: string;
  image: string;
  title: string;
  active: boolean;
  hp: number;
  atk: number;
  tokenId: String;
  assets: string;
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
  hp: 0,
  atk: 0,
  active: false,
  assets:
    "https://ipfs.io/ipfs/QmPcvN9XUUPFuu8HG5uC8jHEiWWk5xa8sLUfaqHnmyVHf5/sprites_1111.png",
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
      state.assets = attribute.assets;
      state.atk = attribute.atk;
      state.hp = attribute.hp;
      state.level = attribute.level;
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
