import { api } from "../apis";
import { API } from "../apis/constants";

export type NFT_JSONdata = {
  name: string;
  image: string;
  type: string;
  title?: string;
  tokenId: string;
  attributes: object;
  description: string;
};

export type NFT = {
  owner: string;
  tokenid: string;
  tokenuri: string;
  exp: number;
  JSONdata: NFT_JSONdata;
};
export class UserService {
  static async getNFTsByOwner(address: `0x${string}` | undefined) {
    return new Promise<NFT[]>(async (resolve, reject) => {
      try {
        const response = await api.get(API.NFT + `/${address}`);

        resolve(response.data.data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }
}
