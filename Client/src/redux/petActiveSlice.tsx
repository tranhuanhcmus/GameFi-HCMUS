import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface PetActiveState {
  name: string;
  type: string;
  image: string;
  title: string;
  active: boolean;
  hp: number;
  atk: number;
  tokenId: String;
  boost: {
    boostType: string;
    boostStatus: boolean;
  };
  assets: string;
  level: number;
  attributes: {
    element: string;
    eye: string;
    fur: string;
    item: string;
  };
}

const initialState: PetActiveState = {
  name: "",
  type: "",
  image: "",
  title: "",
  hp: 0,
  atk: 0,
  active: false,
  boost: {
    boostType: "",
    boostStatus: false,
  },
  assets: "",
  tokenId: "",
  level: 0,
  attributes: {
    element: "",
    eye: "",
    fur: "",
    item: "",
  },
};

const petActiveSlice = createSlice({
  name: "petActive",
  initialState,
  reducers: {
    updatePetActive(state, action) {
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
    updateBoost(state, action) {
      state.boost = action.payload;
    },
  },
});

export const { updatePetActive, updateBoost } = petActiveSlice.actions;

export default petActiveSlice.reducer;
