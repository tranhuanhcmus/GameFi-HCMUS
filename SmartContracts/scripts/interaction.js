//const Web3 = require('web3') 
//import {Web3} from "web3";
const { Web3 } = require('web3');
const axios = require('axios');

const petAbi = [{
        "inputs": [{
            "internalType": "address",
            "name": "initialOwner",
            "type": "address"
        }],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "ERC721IncorrectOwner",
        "type": "error"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ERC721InsufficientApproval",
        "type": "error"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "approver",
            "type": "address"
        }],
        "name": "ERC721InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }],
        "name": "ERC721InvalidOperator",
        "type": "error"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }],
        "name": "ERC721InvalidOwner",
        "type": "error"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "receiver",
            "type": "address"
        }],
        "name": "ERC721InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "sender",
            "type": "address"
        }],
        "name": "ERC721InvalidSender",
        "type": "error"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "ERC721NonexistentToken",
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
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
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
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": false,
                "internalType": "uint256",
                "name": "_fromTokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_toTokenId",
                "type": "uint256"
            }
        ],
        "name": "BatchMetadataUpdate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "MetadataUpdate",
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
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "exp",
                "type": "uint256"
            }
        ],
        "name": "SetExp",
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
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [{
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "exp_plus",
                "type": "uint256"
            }
        ],
        "name": "addExp",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "owner",
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
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "getApproved",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "getExp",
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
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
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
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "ownerOf",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "petExp",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
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
        "inputs": [{
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "uri",
                "type": "string"
            }
        ],
        "name": "safeMint",
        "outputs": [],
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
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
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
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
        }],
        "name": "supportsInterface",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
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
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "tokenURI",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
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
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
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

//const petAddress = "0xd11875cE6854da3518273cF16Ab2FC399224Bed9"
const petAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const PRVK = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

const myAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
const receiverAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
const receiverPRVK = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
const WALLET_PUBLIC_KEY = myAddress

var web3

const initWeb3 = async() => {
    web3 = new Web3('ws://127.0.0.1:8545/')
    web3.eth.accounts.wallet.add(PRVK)
}

const deposit = async(amount) => {
    try {
        const transaction = {
            from: receiverAddress,
            to: WALLET_PUBLIC_KEY,
            value: web3.utils.toWei(amount.toString(), 'ether'),
            gas: '0x5208',
            maxPriorityFeePerGas: web3.utils.toWei('2', 'gwei'), // Example priority fee
            maxFeePerGas: web3.utils.toWei('100', 'gwei') // Example max fee
        };

        const signedTx = await web3.eth.accounts.signTransaction(transaction, receiverPRVK);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    } catch (error) {
        console.error('Error during deposit:', error);
    }
};

const catchDeposit = async() => {
    console.log('Watching for ETH transfers to server wallet...');
    let subscriptionDeposit = await web3.eth.subscribe('pendingTransactions', function(error, result) {
        if (error)
            console.log(error);
    })
    subscriptionDeposit.on('data', async function(transactionHash) {
        try {
            const receipt = await waitForConfirmation(transactionHash);

            if (receipt.status) {
                const transaction = await web3.eth.getTransaction(transactionHash);

                if (transaction && transaction.to && transaction.to.toLowerCase() === WALLET_PUBLIC_KEY.toLowerCase()) {
                    console.log('Successful ETH transfer to server wallet detected:', transactionHash);
                    const sender = transaction.from;
                    const value = web3.utils.fromWei(transaction.value, 'ether');
                    console.log(`Received ${value} ETH from ${sender}`);
                }
            }
        } catch (error) {
            console.error('Error processing transaction:', error);
        }
    })
    subscriptionDeposit.on('error', async(error) => {
        console.error('Subscription error:', error);
        await subscription.unsubscribe();
    });
}

function waitForConfirmation(txHash) {
  return new Promise((resolve, reject) => {
      web3.eth.getTransactionReceipt(txHash)
          .then(receipt => {
              if (receipt) {
                  resolve(receipt);
              } else {
                  web3.eth.subscribe('confirmation', txHash)
                      .on('data', async (confirmationData) => {
                          if (confirmationData.confirmations === 1) {
                              const receipt = await web3.eth.getTransactionReceipt(txHash);
                              resolve(receipt);
                          }
                      })
                      .on('error', error => reject(error));
              }
          })
          .catch(error => reject(error));
  });
}

async function interact() {
    // const web3 = new Web3("ws://localhost:8545");
    const petContract = await new web3.eth.Contract(petAbi, petAddress)

    //call
    // let owner=await petContract.methods.owner().call()
    // console.log('-----------------------------');
    // console.log('owner:',owner);
    // console.log('-----------------------------');

    // let balanceOf=await petContract.methods.balanceOf(myAddress).call()
    // console.log('-----------------------------');
    // console.log('balanceOf:',Number(balanceOf));
    // console.log('-----------------------------');

    //  ---------------------------SAFE MINT--------------------------------------
    let json_client_id = 'QmZqaCxqodLqypCP4bWce77mnYuDmpFmXYzSB1wqFg1orH'
    let new_token_id = 1138
    let new_token_uri = `https://ipfs.io/ipfs/${json_client_id}/${new_token_id}.json`

    // const result = await petContract.methods.safeMint(myAddress, new_token_id, new_token_uri).send({ from: myAddress});
    // let newNFT= await petContract.methods.tokenURI(new_token_id).call()
    // console.log('New NFT is Mint success:',newNFT);

    // let exp_token_id=1118

    // // // --------------addExp---------------
    // let addExp_result=await petContract.methods.addExp(exp_token_id,10000).send({ from: myAddress })
    // console.log(addExp_result);

    // // --------------getExp---------------
    // let exp=await petContract.methods.getExp(exp_token_id).call()
    // console.log('-----------------------------');
    // console.log(`exp of ${exp_token_id}:`,Number(exp));
    // console.log('-----------------------------');
    setInterval(async () => {
      await deposit(0.3)
    }, 3000);
}


initWeb3()
catchDeposit()
interact()