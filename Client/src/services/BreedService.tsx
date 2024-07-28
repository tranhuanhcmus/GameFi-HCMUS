import { api } from "../apis";
import { API } from "../apis/constants";
import logger from "../logger";

export class BreedService {
  /**
   * GET COIN ON HEADER
   * @param address
   * @returns
   */
  static async breed(dad: any, mom: any, address: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await api.post(API.BREED, {
          dad: dad,
          mom: mom,
          owner: address,
        });
        console.log("breedFunction", {
          dad: dad,
          mom: mom,
          owner: address,
        });
        console.log("breed service ", response.data);
        resolve(response.data.data);
      } catch (error: any) {
        console.log("breed error ", error);
        reject(error.message);
      }
    });
  }
}
