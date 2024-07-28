import { api } from "../apis";
import { API } from "../apis/constants";

export class UsersService {
  static async getOwnerEnergy(address: string) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await api.get(API.USERS + `/energy/${address}`);

        console.log("response ", response);
        resolve(response.data.data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }
  static async getEnergyNFT(tokenId: string) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await api.get(API.USERS + `/energyNFT/${tokenId}`);

        console.log("response ", response);
        resolve(response.data.data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }

  static async playGame(address: string, body: object) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await api.post(API.USERS + `/energy/${address}`, body);

        console.log("response ", response);
        resolve(response.data.data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }
}
