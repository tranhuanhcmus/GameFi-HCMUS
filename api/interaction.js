const { ContractController } = require("./controllers/ContractController");
require('dotenv').config()
const WALLET_PUBLIC_KEY = process.env.WALLET_PUBLIC_KEY || ''
async function run(){
    try {
        let to_address=WALLET_PUBLIC_KEY

        let json_client_id='QmYXQ36GK4L5hiBdTBBKj96HMLr2zk1bNsagCLmW3Dnp6T'
        let new_token_id=1117
        let new_token_uri=`https://ipfs.io/ipfs/${json_client_id}/${new_token_id}.json`

        let result=await ContractController.safeMint(to_address,new_token_id,new_token_uri)
        console.log(result);

    } catch (error) {
        console.log(error);
    }
}
run()