import { API, api } from "apis";

export class NFTService {

	static async getList(){
		return new Promise(async (resolve, reject) => {
			try {
			  const response = await api.get(
				API.NFT,
			  );
			  resolve(response.data.data);
			} catch (error) {
			  reject(error.message);
			}
		  });
	}
	static async getById(id){
		return new Promise(async (resolve, reject) => {
			try {
			  const response = await api.get(
				`${API.NFT}/${id}`,
			  );
			  resolve(response.data.data);
			} catch (error) {
			  reject(error.message);
			}
		  });
	}
	
  }