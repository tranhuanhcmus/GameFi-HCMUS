import { api } from "../apis";
import { API } from "../apis/constants";
export type NFT={
	owner:string,
	tokenid:string,
	tokenuri:string,
  }
export class UserService{
	static async getNFTsByOwner(address:string) {
		return new Promise<NFT[]>(async (resolve, reject) => {
		  try {
			const response = await api.get(API.USER+`/${address}`)
			
			resolve(response.data)
		  } catch (error:any) {
			reject(error.message);
		  }
		});
	  }
}