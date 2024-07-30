import { api } from "../apis";
import { API } from "../apis/constants";
import logger from "../logger";

interface item {
  id: string;
  owner: string;
  quantity: number;

  tokenId: number;
}

export class EatService {
  /**
   * GET COIN ON HEADER
   * @param address
   * @returns
   */
  static async Eat(data: item) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.post(API.ITEM_APP_OWNER + `/useItem`, data);

        resolve(response.data);
      } catch (error: any) {
        reject(error.message);
        console.log(error.message);
      }
    });
  }
}
