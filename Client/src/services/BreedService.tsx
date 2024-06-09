import { api } from "../apis";
import { API } from "../apis/constants";
import logger from "../logger";

export class BreedService {
  /**
   * GET COIN ON HEADER
   * @param address
   * @returns
   */
  static async breed(dad: any, mom: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await api.post(API.BREED, { dad, mom });

        console.log("response ", response.data);
        resolve(response.data.data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }
}
