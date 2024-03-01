const { PetABI, PetAddress } = require("./abis/Pet")
const { Web3 } = require('web3');
const rpc = "wss://eth-sepolia.api.onfinality.io/public";

function catchEventNFT() {
    const web3 = new Web3(rpc);
    const petContract = new web3.eth.Contract(PetABI, PetAddress);

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
    //     console.log("data: ", event.returnValues);
    // })
    // evMitter.on('error', (error, receipt) => {
    //     // fired if the subscribe transaction was rejected by the network with a receipt, the second parameter will be the receipt.
    //     console.log("error on subscribe", error);
    // });


    petContract.getPastEvents('Transfer', {
            filter: {},
            fromBlock: 5333315,
            toBlock: 5333367
        })
        .then(function(events) {
            // Process the retrieved events
            console.log("event: ", events.map(event => event.returnValues));
        })
        .catch(function(error) {
            // Handle errors
            console.error("error when listen event: ", error);
        });

}

module.exports = { catchEventNFT }