import { api } from "../apis";
import { API } from "../apis/constants";

interface item {
  id: string;
  owner: string;
  quantity: number;
  gemcost: number;
  goldcost: number;
  currency: number;
}

export class ItemGameOwnerService {
  /**
   * GET ITEMS IN GAME
   * @param address
   * @returns
   */
  static async getItems(address: `0x${string}` | undefined) {
    return new Promise<any[]>(async (resolve, reject) => {
      try {
        const response = await api.get(
          API.ITEM_GAME_OWNER + `/owner/${address}`,
        );

        resolve(response.data.data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }

  static async buyItem(data: item) {
    return new Promise<any[]>(async (resolve, reject) => {
      try {
        const response = await api.post(
          API.ITEM_GAME_OWNER + `/purchase`,
          data,
        );

        resolve(response.data.data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }
}
