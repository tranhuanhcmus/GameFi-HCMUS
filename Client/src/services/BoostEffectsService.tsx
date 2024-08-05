import { api } from "../apis";
import { API } from "../apis/constants";
import logger from "../logger";

export class BoostEffectsService {
  static async getBoostEffects() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await api.get(API.BOOST_EFFECTS);

        resolve(response.data.data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }
}
