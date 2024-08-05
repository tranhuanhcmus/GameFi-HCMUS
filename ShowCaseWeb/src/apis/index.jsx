import axios from "axios";

export const API = {
  NFT: "/nfts",
//   PET: "/pet/get",
//   ITEM_APP_OWNER: "/itemAppOwners",
//   ITEM_GAME_OWNER: "/itemGameOwners",
//   ITEM_GAME: "/itemGames",
//   ITEM_APP: "/itemApps",
//   BREED: "/bears/breed",
//   server: "https://gamefi-hcmus.onrender.com",
};

export const api = axios.create({
  //baseURL: process.env.BE_API,
  // baseURL: "https://gamefi-hcmus.onrender.com",
  
//   baseURL: "https://gamefi-hcmus.onrender.com",
  baseURL: "https://gamefi-hcmus-aq3q.onrender.com",
  timeout: 30000,
});
