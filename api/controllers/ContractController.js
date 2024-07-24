require('dotenv').config()
const { Web3 } = require('web3');
const axios = require('axios');
const models = require("../database/models")
const { STATUS_CODES, MAX_OWNER_ENERGY } = require("../constants");
const { PetABI, PetAddress } = require('../abis/Pet.js');
const moment = require('moment/moment');


const WALLET_PUBLIC_KEY = process.env.WALLET_PUBLIC_KEY || ''
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || ''

const rpc = `wss://ethereum-sepolia-rpc.publicnode.com`;
const web3 = new Web3(rpc);
web3.eth.accounts.wallet.add(WALLET_PRIVATE_KEY);
const petContract = new web3.eth.Contract(PetABI, PetAddress);

const ContractController = {

    createNFT: async(tokenid, from, to) => {
        try {
            // Get TOKENURI from tokenid
            const tokenURI = await ContractController.getTokenURI(tokenid);
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

                    let tokenData = await ContractController.getInfoFromTokenURI(tokenURI)

                    if (tokenData) {
                        const newRowDataTokenUri = {
                            tokenUri: tokenURI,
                            data: tokenData
                        };

                        //create Token Uri data cache
                        await models.TokenUri.create(newRowDataTokenUri);
                    }

                    console.log(`Add NFT success`);

                    let new_owner=await models.OwnerEnergy.findOne({where:{owner: to}})

                    if(!new_owner){
                        await models.OwnerEnergy.create({
                            owner: to,
                            energy: MAX_OWNER_ENERGY,
                            remainingTime: null
                        })
                    }
                    
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
	

    transferFrom: async(from_address, to_address, tokenId) => {
        try {
            const result = await petContract.methods.transferFrom(from_address,to_address,tokenId).send({ from: WALLET_PUBLIC_KEY });
			return result
        } catch (error) {
            console.error('Error in safeMint:', error);
        }
    },
    
    getExp: async(tokenId) => {
        try {
            const exp = await petContract.methods.getExp(tokenId).call();
            return exp;
        } catch (error) {
            console.error('Error fetching exp:', error);
        }
    },

    addExp: async(tokenId,exp) => {
        try {
            const exp_result = await petContract.methods.addExp(tokenId,exp).send({ from: WALLET_PUBLIC_KEY })
            return exp_result;
        } catch (error) {
            console.error('Error fetching exp:', error);
        }
    },

    

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
    updateDB:(from,to)=>{
        petContract.getPastEvents('Transfer', {
            filter: {},
            fromBlock:  from,
            toBlock: 	to 
        })
        .then(function(events) {
            // Process the retrieved events
            // console.log("event: ", events.map(event => event.returnValues));
            if(events){
                events.forEach(async item=>{
                    const event = item.returnValues;
                    let {from, to, tokenId} = event; 
                    console.log(from, to, tokenId);
                    tokenId=Number(tokenId)
                    if (from === '0x0000000000000000000000000000000000000000') {
                        await ContractController.createNFT(tokenId, from, to);
                    }
                    else {
                        await ContractController.updateNFT(tokenId, to);
                    }
                })
            }
        })
        .catch(function(error) {
            // Handle errors
            console.error("error when listen event: ", error);
        });
    },
    catchEventNFT: () => {
        var evMitter = petContract.events.Transfer({
            filter: {},
            fromBlock: "latest"
        }, (error, event) => {
            console.log('Transfer');

            console.log(event);
        })
        evMitter.on("connected", function(subscriptionId) {
            console.log("connected success with subscriptionId:", subscriptionId);
        })
        evMitter.on('data', async (event) => {
            const {from, to, tokenId} = event.returnValues; 
            if (from === '0x0000000000000000000000000000000000000000') {
                await ContractController.createNFT(tokenId, from, to);
            }
            else {
                await ContractController.updateNFT(tokenId, to);
            }
        })
        evMitter.on('error', (error, receipt) => {
            // fired if the subscribe transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            console.log("error on subscribe", error);
        });

        var evMitter_SetExp = petContract.events.SetExp({
            filter: {},
            fromBlock: "latest"
        }, (error, event) => {
            console.log('SetExp');
            console.log(event);
        })
        evMitter_SetExp.on("connected", function(subscriptionId) {
            console.log("connected success with subscriptionId:", subscriptionId);
        })
        evMitter_SetExp.on('data', async (event) => {
            const {tokenId, exp} = event.returnValues; 

            const row = await models.NFT.findOne({ where: { tokenId: tokenId } })

            if (!row) {
                console.log('not found NFT',tokenId);
            } else {
                await row.update({exp:Number(exp)})
                await row.reload()
            }
        })
        evMitter_SetExp.on('error', (error, receipt) => {
            // fired if the subscribe transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            console.log("error on subscribe", error);
        });
    }
}



module.exports = {
   ContractController,WALLET_PUBLIC_KEY
}