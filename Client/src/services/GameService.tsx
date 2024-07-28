import { api } from "../apis";
import { API } from "../apis/constants";
import logger from "../logger";

export class GameService {
  /**
   * GET COIN ON HEADER
   * @param address
   * @returns
   */
  static async questionGame() {
    return new Promise<any[]>(async (resolve, reject) => {
      try {
        const response = await api.get(API.HANG_MAN);

        resolve(response.data.data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }
}
