require('dotenv').config()
const { Web3 } = require('web3');
const axios = require('axios');
const models = require("../database/models")
const { STATUS_CODES } = require("../constants");
const { PetABI, PetAddress } = require('../abis/Pet.js');


const WALLET_PUBLIC_KEY = process.env.WALLET_PUBLIC_KEY || ''
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || ''

const rpc = "wss://eth-sepolia.api.onfinality.io/public";
const web3 = new Web3(rpc);
web3.eth.accounts.privateKeyToAccount(WALLET_PRIVATE_KEY);
const petContract = new web3.eth.Contract(PetABI, PetAddress);

const ContractController = {

    createNFT: async(tokenid, from, to) => {
        try {
            // Get TOKENURI from tokenid
            const tokenURI = await getTokenURI(tokenid);
            console.log(tokenURI, tokenid);

            // Check if TOKENURI exists and is not empty
            if (tokenURI) {
                const row = await models.NFT.findOne({ where: { tokenId: tokenid } });

                if (row) {
                    console.log(`Token ID ${tokenid} already exists in the database`);
                    return {
                        data: null,
                        message: `Token ID ${tokenid} already exists in the database`,
                        statusCode: STATUS_CODES.BAD_REQUEST
                    };
                } else {
                    const newRowData = {
                        tokenId: tokenid,
                        tokenUri: tokenURI,
                        owner: to,
                        lastTimePlayed: new Date()
                    };
                    //create NFt
                    const newRow = await models.NFT.create(newRowData);

                    let tokenData = await getInfoFromTokenURI(tokenURI)

                    if (tokenData) {
                        const newRowDataTokenUri = {
                            tokenUri: tokenURI,
                            data: tokenData
                        };

                        //create Token Uri data cache
                        await models.TokenUri.create(newRowDataTokenUri);
                    }

                    console.log(`Add NFT success`);
                    return {
                        data: newRow,
                        message: 'Add NFT success',
                        statusCode: STATUS_CODES.OK
                    };
                }
            } else {
                console.log('No or error retrieving TOKENURI from tokenid:', tokenid);
                return {
                    message: 'No or error retrieving TOKENURI from tokenid',
                    statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR
                };
            }
        } catch (error) {
            console.log('Failed to create new NFT', error.message);
            return {
                message: error.message,
                statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR
            };
        }
    },


    updateNFT: async(tokenid, to) => {
        try {
            console.log(tokenid, to);

            const row = await models.NFT.findOne({ where: { tokenId: tokenid } });

            if (row.owner === to) {
                console.log(`Owner of NFT has already been ${to}`);
                return {
                    data: row,
                    message: `Update ID ${tokenid} success`,
                    statusCode: STATUS_CODES.OK
                };
            }

            if (!row) {
                console.log(`Token ID ${tokenid} not found`);
                return {
                    data: null,
                    message: `Token ID ${tokenid} not found`,
                    statusCode: STATUS_CODES.NOT_FOUND
                };
            }

            const updateData = {
                tokenId: tokenid,
                tokenUri: row.tokenUri,
                owner: to,
                exp: row.exp,
                lastTimePlayed: new Date()
            };

            await row.update(updateData);
            await row.reload();

            console.log(`update NFT success to ${to}`);
            return {
                data: row,
                message: `Update ID ${tokenid} success`,
                statusCode: STATUS_CODES.OK
            };
        } catch (error) {
            console.error('Failed to update NFT', error);
            return {
                data: null,
                message: 'Error updating NFT',
                statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR
            };
        }
    },


    getInfoFromTokenURI: async(url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Re-throw the error for handling at a higher level
        }
    },
    safeMint: async(to_address, tokenId, uri) => {
        try {
            const result = await petContract.methods.safeMint(to_address, tokenId, uri).send({ from: WALLET_PUBLIC_KEY });
			return result
        } catch (error) {
            console.error('Error in safeMint:', error);
        }
    },
	getMethods:()=>{
		try {
            const result = petContract.methods
           return result
          
        } catch (error) {
            console.error( error);
           
        }
	},

    transferFrom: async(from_address, to_address, tokenId) => {},
    getTokenURI: async(tokenId) => {
        try {
            const uri = await petContract.methods.tokenURI(tokenId).call();
            return uri;
        } catch (error) {
            console.error('Error fetching token URI:', error);
        }
    },
    getOwner: async() => {
        try {
            const owner = await petContract.methods.owner().call();
            return owner;
        } catch (error) {
            console.error('Error fetching token URI:', error);
            return ''
        }
    },

    catchEventNFT: () => {

        // var evMitter = petContract.events.Transfer({
        //     filter: {},
        //     fromBlock: "latest"
        // }, (error, event) => {
        //     console.log(event);
        // })
        // evMitter.on("connected", function(subscriptionId) {
        //     console.log("connected success with subscriptionId:", subscriptionId);
        // })
        // evMitter.on('data', (event) => {
        //     const {from, to, tokenId} = event.returnValues; 
        //     console.log('from: ', from);
        //     if (from === '0x0000000000000000000000000000000000000000') {
        //         createNFT(tokenId, from, to);
        //     }
        //     else {
        //         updateNFT(tokenId, to);
        //     }
        // })
        // evMitter.on('error', (error, receipt) => {
        //     // fired if the subscribe transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        //     console.log("error on subscribe", error);
        // });


        // petContract.getPastEvents('Transfer', {
        //     filter: {},
        //     fromBlock:  5969058,
        //     toBlock: 'latest' 
        // })
        // .then(function(events) {
        //     // Process the retrieved events
        //     // console.log("event: ", events.map(event => event.returnValues));
        //     if(events){
        //         events.forEach(item=>{
        //             const event = item.returnValues;
        //             const {from, to, tokenId} = event; 
        //             console.log("event",event);
        //             if (from === '0x0000000000000000000000000000000000000000') {
        //                 createNFT(tokenId, from, to);
        //             }
        //             else {
        //                 updateNFT(tokenId, to);
        //             }
        //         })
        //     }
        // })
        // .catch(function(error) {
        //     // Handle errors
        //     console.error("error when listen event: ", error);
        // });
    }
}



module.exports = {
   ContractController
}