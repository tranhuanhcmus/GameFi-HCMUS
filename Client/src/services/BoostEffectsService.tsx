import { api } from "../apis";
import { API } from "../apis/constants";
import logger from "../logger";

export class BoostEffectsService {
  static async getBoostEffects(address: `0x${string}` | undefined) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await api.get(API.BOOST_EFFECTS + `/${address}`);

        console.log("response ", response);
        resolve(response.data.data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }
}
