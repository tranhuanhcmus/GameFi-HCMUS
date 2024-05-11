import { api } from "../apis";
import { API } from "../apis/constants";

export type NFT_JSONdata={
	name:string,
	image:string,
	type:string,
	title?:string,
	tokenId:string,
	attributes:object,
	description:string
}

export type NFT={
	owner:string,
	tokenid:string,
	tokenuri:string,
	exp:number,
	JSONdata:NFT_JSONdata
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