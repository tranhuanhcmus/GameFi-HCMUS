const { ContractController } = require('./controllers/ContractController');

require('dotenv').config()

const WALLET_PUBLIC_KEY = process.env.WALLET_PUBLIC_KEY || ''
async function run(){
	// let tokenURI=await ContractController.getTokenURI(1111);
	// let json_data= await ContractController.getInfoFromTokenURI(tokenURI)

	let new_token_id=1117
	let new_token_uri=`https://ipfs.io/ipfs/QmcjDHADFoBHFfRemMqNyAFAUT9VKnQQBEYQqizm2Hx8YA/${new_token_id}.json`

	let result=await ContractController.safeMint(WALLET_PUBLIC_KEY,new_token_id,new_token_uri)
	console.log(result);
}
run()