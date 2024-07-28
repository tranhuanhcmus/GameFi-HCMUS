const { ContractController } = require("./controllers/ContractController");
require('dotenv').config()
const WALLET_PUBLIC_KEY = process.env.WALLET_PUBLIC_KEY || ''
async function run(){
    try {
        let to_address=WALLET_PUBLIC_KEY

        let json_client_id='QmZqaCxqodLqypCP4bWce77mnYuDmpFmXYzSB1wqFg1orH'
        let new_token_id=6537
        let new_token_uri=`https://ipfs.io/ipfs/${json_client_id}/${new_token_id}.json`

        let result=await ContractController.safeMint(to_address,new_token_id,new_token_uri)
        console.log(result);

    } catch (error) {
        console.log(error);
    }
}

async function updateDB(){
    ContractController.updateDB()
}
run()