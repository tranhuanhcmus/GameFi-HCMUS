import { api } from "../apis";
import { API } from "../apis/constants";

export class ItemAppOwnerService {
  /**
   * GET COIN ON HEADER
   * @param address
   * @returns
   */
  static async getCurrency(address: `0x${string}` | undefined) {
    return new Promise<any[]>(async (resolve, reject) => {
      try {
        const response = await api.get(
          API.ITEM_APP_OWNER + `/currency/${address}`,
        );

        resolve(response.data.data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }

  /**
   * GET ITEMS IN INVENTORY
   * @param address
   * @returns
   */
  static async getItems(address: `0x${string}` | undefined) {
    return new Promise<any[]>(async (resolve, reject) => {
      try {
        const response = await api.get(API.NFT + `/${address}`);

        console.log("response ", response.data);
        resolve(response.data.data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }
}
