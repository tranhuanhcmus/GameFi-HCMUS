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
  energy: number;
  tokenId: String;
  assets: string;
  level: number;
  attributes: {
    element: number;
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
  energy: 0,
  hp: 0,
  atk: 0,
  active: false,
  assets: "",
  tokenId: "",
  level: 0,
  attributes: {
    element: 0,
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
      state.energy = attribute.energy;
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
    updateLevel(state, action: PayloadAction<number>) {
      state.level = state.level + action.payload;
    },
    updateEnergy(state, action: PayloadAction<number>) {
      state.energy = action.payload;
    },
  },
});

export const { updatePet, updateLevel, updateEnergy } = petSlice.actions;

export default petSlice.reducer;
