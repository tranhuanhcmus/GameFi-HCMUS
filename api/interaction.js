//const Web3 = require('web3') 
//import {Web3} from "web3";
const {Web3} = require('web3');
const axios = require('axios');
const floppyAbi = [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "approver",
            "type": "address"
        }],
        "name": "ERC20InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "receiver",
            "type": "address"
        }],
        "name": "ERC20InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "sender",
            "type": "address"
        }],
        "name": "ERC20InvalidSender",
        "type": "error"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "spender",
            "type": "address"
        }],
        "name": "ERC20InvalidSpender",
        "type": "error"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "account",
            "type": "address"
        }],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "account",
            "type": "address"
        }],
        "name": "balanceOf",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "burnFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
        }],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
const floppyAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const PRVK='0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

const myAddress="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
const receiverAddress="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
function interact(){
    const web3 = new Web3('ws://127.0.0.1:8545');
    const floppyContract = new web3.eth.Contract(floppyAbi, floppyAddress);

    //    floppyContract.getPastEvents('Transfer', {
    //         filter: { }, // Optional event filtering
    //         fromBlock: 0, // Start block number
    //         toBlock: 'latest' // End block number
    //         })
    //         .then(function(events) {
    //         // Process the retrieved events
    //         console.log("event: ", events[events.length - 1].returnValues);
    //         })
    //         .catch(function(error) {
    //         // Handle errors
    //         console.error("error: ", error);
    //     });

    var evMitter = floppyContract.events.Transfer({
        filter: { }, // Optional event filtering
        fromBlock: 0, // Start block number
        toBlock: 'latest' // End block number
    }, (error, event) => {
        // catchEvent(error, event);
    })
    // // console.log("evMitter: ", evMitter);
    // // debugger;
    // evMitter.on('error', (error, receipt) => {
    //     // fired if the subscribe transaction was rejected by the network with a receipt, the second parameter will be the receipt.
    //     console.log(error);
    // });
    evMitter.on('data', (event) => {
        // fired when we get a new log that matches the filters for the event type we subscribed to
        // will be fired at the same moment as the callback above
        console.log(event.returnValues);
    })
    // .on("connected", (subscriptionId) => {
    //     // fired after subscribing to an event
    //     console.log(subscriptionId);
    // })
    // .on('data', (event) => {
    //     // fired when we get a new log that matches the filters for the event type we subscribed to
    //     // will be fired at the same moment as the callback above
    //     console.log(event);
    // })
    let options = {
        filter: {
            value: [],
        },
        fromBlock: 0,
        toBlock: 'latest'
    };
} 

async function catchEvent (error, event) {
    // fired when we get a new log that matches the filters for the event type we subscribed to
    if (!error) {
        console.log(event);

        // Make a POST request when the 'data' event is triggered
        try {
            const response = await axios.post('http://localhost:4500/ev-in',
                event,
                {
                    headers: {
                    "Content-Type": "application/json",
                    },
                }
            );

            console.log('POST request successful:', response.data);
        } catch (postError) {
            console.error('Error making POST request:', postError.message);
        }
    }
};

module.exports = {interact};