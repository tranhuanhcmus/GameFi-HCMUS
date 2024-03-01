const { PetABI, PetAddress } = require("./abis/Pet")
const { Web3 } = require('web3');
const rpc = "wss://eth-sepolia.api.onfinality.io/public";
const db = require('./config.js');

const createNFT = async (tokenid, from, to) => {
  try {
    const tokenURI = await getTokenURI(tokenid);
    console.log(tokenURI, tokenid);
    // Execute the logic of AddUser stored procedure
    await db.query(
      'INSERT INTO K20_GameFi_DATN_HCMUS.NFT (TOKENID, TOKENURI, OWNER) VALUES ($1, $2, $3)',
      [tokenid, tokenURI, to]
    );
    console.log('Tạo NFT thành công');
    return { message: 'Tạo NFT thành công' };
  } catch (error) {
    console.log('Tạo mới không thành công', error.message);
    // throw error;
  }
};

const updateNFT = async (tokenid, to) => {
  try {
    console.log(tokenid, to);
    // Execute the logic of updating NFT ownership
    await db.query(
      'UPDATE K20_GameFi_DATN_HCMUS.NFT SET OWNER = $2 WHERE TOKENID = $1',
      [tokenid, to]
    );
    console.log('Cập nhật NFT thành công');
    return { message: 'Cập nhật NFT thành công' };
  } catch (error) {
    console.error('Cập nhật không thành công', error);
    // throw error; // Rethrow the error to handle it at the caller's level
  }
};

const getTokenURI = async (tokenId) => {
  try {
    const web3 = new Web3(rpc);
    const petContract = new web3.eth.Contract(PetABI, PetAddress);
    const uri = await petContract.methods.tokenURI(tokenId).call();
    return uri;
  } catch (error) {
    console.error('Error fetching token URI:', error);
  }
};


function catchEventNFT() {
    const web3 = new Web3(rpc);
    const petContract = new web3.eth.Contract(PetABI, PetAddress);

    var evMitter = petContract.events.Transfer({
        filter: {},
        fromBlock: "latest"
    }, (error, event) => {
        console.log(event);
    })
    evMitter.on("connected", function(subscriptionId) {
        console.log("connected success with subscriptionId:", subscriptionId);
    })
    evMitter.on('data', (event) => {
        const {from, to, tokenId} = event.returnValues; 
        console.log('from: ', from);
        if (from === '0x0000000000000000000000000000000000000000') {
            createNFT(tokenId, from, to);
        }
        else {
            updateNFT(tokenId, to);
        }
    })
    evMitter.on('error', (error, receipt) => {
        // fired if the subscribe transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log("error on subscribe", error);
    });


    // petContract.getPastEvents('Transfer', {
    //     filter: {from: '0x0000000000000000000000000000000000000000'},
    //     fromBlock: 5224541,
    //     toBlock: 5224549
    // })
    // .then(function(events) {
    //     // Process the retrieved events
    //     // console.log("event: ", events.map(event => event.returnValues));
    //     const event = events[0].returnValues;
    //     const {from, to, tokenId} = event; 
    //     createNFT(tokenId, from, to);
    // })
    // .catch(function(error) {
    //     // Handle errors
    //     console.error("error when listen event: ", error);
    // });
}

module.exports = { catchEventNFT }