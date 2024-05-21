import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface BreedState {
  fatherPet: any;
  motherPet: any;
}
const initialState: BreedState = {
  fatherPet: {
    id: null,
    name: null,
    image: null,
  },
  motherPet: {
    id: null,
    name: null,
    image: null,
  },
};

const breedSlice = createSlice({
  name: "breed",
  initialState,
  reducers: {
    setFatherPet(state, action) {
      state.fatherPet = action.payload;
      return state;
    },

    setMotherPet(state, action) {
      state.motherPet = action.payload;
      return state;
    },
  },
});

export const { setFatherPet, setMotherPet } = breedSlice.actions;

export default breedSlice.reducer;
