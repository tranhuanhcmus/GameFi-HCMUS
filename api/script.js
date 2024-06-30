const { ContractController } = require('./controllers/ContractController');

require('dotenv').config()

const WALLET_PUBLIC_KEY = process.env.WALLET_PUBLIC_KEY || ''
async function run() {
    // ---------------------------Get TokenURI--------------------------------------
    // let tokenURI=await ContractController.getTokenURI(1111);
    // let json_data= await ContractController.getInfoFromTokenURI(tokenURI)
    // console.log(json_data);

    // ---------------------------SAFE MINT--------------------------------------
    // let new_token_id=1128
    // let new_token_uri=`https://ipfs.io/ipfs/QmcjDHADFoBHFfRemMqNyAFAUT9VKnQQBEYQqizm2Hx8YA/${new_token_id}.json`

    // let result=await ContractController.safeMint(WALLET_PUBLIC_KEY,new_token_id,new_token_uri)
    // console.log(result);

    // ---------------------------Transfer--------------------------------------
    let from = WALLET_PUBLIC_KEY
    let to = `0x62EAFC86EEA3e1511D1E90c1fBca9fEFBfC3E621`
    let token_id = 1128
    let result = await ContractController.transferFrom(from, to, token_id)
    console.log(result);
}
run()