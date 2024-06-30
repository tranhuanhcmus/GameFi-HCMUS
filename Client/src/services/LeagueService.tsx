import { api } from "../apis";
import { API } from "../apis/constants";
import logger from "../logger";

export class LeagueService {

  static async getUserCupsList() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await api.get(API.CUP +"/year");

        console.log("response ", response);
        resolve(response.data.data);
      } catch (error: any) {
        reject(error.message);
      }
    });
  }
}
