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

interface item1 {
  id: string;
  quality: string;
  category: string;
  owner: string;
  quantity: number;
  gemcost: number;
  goldcost: number;
  currency: number;
}

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
        const response = await api.get(
          API.ITEM_APP_OWNER + `/owner/${address}`,
        );

        resolve(response.data.data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }

  static async getReward(address: `0x${string}` | undefined) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await api.get(API.ITEM_APP_OWNER + `/win/${address}`);

        resolve(response.data.data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }

  static async buyItem(data: item) {
    return new Promise<any[]>(async (resolve, reject) => {
      try {
        const response = await api.post(API.ITEM_APP_OWNER + `/purchase`, data);

        resolve(response.data.data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }
  static async buyItemPack(data: item1) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await api.post(
          API.ITEM_APP_OWNER + `/purchasePack`,
          data,
        );

        resolve(response.data.data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }
}
