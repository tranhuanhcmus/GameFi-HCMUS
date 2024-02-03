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
//const floppyAddress = "0xd11875cE6854da3518273cF16Ab2FC399224Bed9"
const floppyAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
const PRVK='0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0'

const myAddress="0xdD2FD4581271e230360230F9337D5c0430Bf44C0"
const receiverAddress="0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"
async function interact(){
    // const web3 = new Web3("ws://localhost:8545");
	const web3=await new Web3('http://127.0.0.1:8545/')
	floppyContract =await new web3.eth.Contract(floppyAbi,floppyAddress)

	//call
	myBalance=await floppyContract.methods.balanceOf(myAddress).call()
	console.log(myBalance);

	//send
	//transfer token
	await web3.eth.accounts.wallet.add(PRVK)
	receiverBalanceBefore=await floppyContract.methods.balanceOf(receiverAddress).call()

	rs= await floppyContract.methods.transfer(receiverAddress,100000).send({
		from:myAddress,
		gas:300000,
	})

	receiverBalanceAfter=await floppyContract.methods.balanceOf(receiverAddress).call()
	
    // floppyContract.events.Transfer({
    //     filter: { }, // Optional event filtering
    //     fromBlock: 0, // Start block number
    //     toBlock: 'latest' // End block number
    // }, (error, event) => {
    //     catchEvent(error, event);
    // })
    // .on("connected", (subscriptionId) => {
    //     // fired after subscribing to an event
    //     console.log(subscriptionId);
    // })
    // .on('data', (event) => {
    //     // fired when we get a new log that matches the filters for the event type we subscribed to
    //     // will be fired at the same moment as the callback above
    //     console.log(event);
    // })

	console.log(rs,receiverBalanceBefore,receiverBalanceAfter);
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

interact()