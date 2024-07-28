import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { BOOST } from "../constants/types";

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
  energy: number;
  level: number;
  attributes: {
    element: number;
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
  energy: 0,
  level: 0,
  attributes: {
    element: 0,
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
      state.energy = attribute.energy;
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
      // if (action.payload.boostStatus === true) {
      //   if (action.payload.boostType === BOOST.HEALTH) {
      //     state.hp = state.hp * 1.2;
      //   } else {
      //     state.atk = state.atk * 1.2;
      //   }
      // }
    },

    updateEnergy(state, action: PayloadAction<number>) {
      state.energy = action.payload;
    },
  },
});

export const { updatePetActive, updateBoost, updateEnergy } =
  petActiveSlice.actions;

export default petActiveSlice.reducer;
