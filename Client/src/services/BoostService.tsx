import { api } from "../apis";
import { API } from "../apis/constants";

export class BoostService {
  /**
   * GET ITEMS IN INVENTORY
   * @param address
   * @returns
   */
  static async getStatusBoost(address: `0x${string}` | undefined) {
    return new Promise<any[]>(async (resolve, reject) => {
      try {
        const response = await api.get(API.BOOSTEFFECT + `/owner/${address}`);

        resolve(response.data.data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }
}
