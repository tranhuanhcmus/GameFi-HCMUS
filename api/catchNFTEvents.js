const { PetABI, PetAddress } = require("./abis/Pet.js")
const { Web3 } = require('web3');
const rpc = "wss://eth-sepolia.api.onfinality.io/public";
const db = require('./config.js');
const axios = require('axios');

const createNFT = async (tokenid, from, to) => {
    try {
        // Lấy TOKENURI từ tokenid
        const tokenURI = await getTokenURI(tokenid);
        console.log(tokenURI, tokenid);

        // Kiểm tra xem TOKENURI có tồn tại và không rỗng không
        if (tokenURI) {
            // Kiểm tra xem NFT đã tồn tại trong cơ sở dữ liệu chưa
            const existingNFTResult = await db.query(
                'SELECT COUNT(*) FROM K20_GameFi_DATN_HCMUS.NFT WHERE TOKENID = $1',
                [tokenid]
            );
            const existingNFTCount = parseInt(existingNFTResult.rows[0].count);

            if (existingNFTCount === 0) {
                // Gọi hàm createTokenURI để tạo mới TOKENURI trước khi thêm mới NFT
                const createTokenURIResult = await CreateTokenURI(tokenid);
                if (createTokenURIResult.apiCode === 500 || createTokenURIResult.apiCode === 404) {
                    console.log('Lỗi khi tạo mới TOKENURI:', createTokenURIResult.message);
                    return createTokenURIResult;
                }

                // Thêm mới NFT vào bảng NFT
                await db.query(
                    'INSERT INTO K20_GameFi_DATN_HCMUS.NFT (TOKENID, TOKENURI, OWNER) VALUES ($1, $2, $3)',
                    [tokenid, tokenURI, to]
                );
                console.log('Tạo NFT thành công');
                return { message: 'Tạo NFT thành công', apiCode: 200 };
            } else {
                console.log('NFT đã tồn tại trong cơ sở dữ liệu');
                return { message: 'NFT đã tồn tại trong cơ sở dữ liệu', apiCode: 409 };
            }
        } else {
            console.log('Không có hoặc lỗi khi lấy thông tin TOKENURI từ tokenid:', tokenid);
            return { message: 'Không có hoặc lỗi khi lấy thông tin TOKENURI từ tokenid', apiCode: 404 };
        }
    } catch (error) {
        console.log('Tạo mới NFT không thành công', error.message);
        return { message: 'Lỗi khi tạo mới NFT', apiCode: 500 };
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
    console.error('Cập nhật NFT không thành công', error);
    // throw error; // Rethrow the error to handle it at the caller's level
  }
};

async function getInfoFromTokenURI(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error for handling at a higher level
    }
}

const CreateTokenURI = async (tokenURI) => {
    try {
        // Kiểm tra xem tokenURI đã tồn tại trong bảng TOKENURI chưa
        const checkResult = await db.query(
            'SELECT COUNT(*) FROM K20_GameFi_DATN_HCMUS.TOKENURI WHERE TOKENURI = $1',
            [tokenURI]
        );
        const existingRecordCount = parseInt(checkResult.rows[0].count);

        if (existingRecordCount > 0) {
            console.log('tokenURI đã tồn tại trong cơ sở dữ liệu.');
            return { message: 'tokenURI đã tồn tại trong cơ sở dữ liệu.', apiCode: 409 };
        }

        // Nếu tokenURI chưa tồn tại, tiến hành thêm mới
        const data = await getInfoFromTokenURI(tokenURI);
        if (data != null) {
            await db.query(
                'INSERT INTO K20_GameFi_DATN_HCMUS.TOKENURI (TOKENURI, DATA) VALUES ($1, $2)',
                [tokenURI, data]
            );
            console.log('Tạo TOKENURI thành công');
            return { message: 'Tạo TOKENURI thành công', apiCode: 200 };
        } else {
            console.log('Không có dữ liệu từ URL.');
            return { message: 'Không có dữ liệu từ URL.', apiCode: 404 };
        }
    } catch (error) {
        console.log('Lỗi khi tạo mới TOKENURI:', error.message);
        return { message: 'Lỗi khi tạo mới TOKENURI', apiCode: 500 };
    }
};

const UpdateTokenURI = async (tokenURI) => {
    try {
        const data = await getInfoFromTokenURI(tokenURI);
        if (data != null) {
            const result = await db.query(
                'UPDATE K20_GameFi_DATN_HCMUS.TOKENURI SET DATA = $1 WHERE TOKENURI = $2',
                [data, tokenURI]
            );
            if (result.rowCount > 0) {
                console.log('Cập nhật TOKENURI thành công');
                return { message: 'Cập nhật TOKENURI thành công', apiCode: 200 };
            } else {
                console.log('Không tìm thấy TOKENURI để cập nhật');
                return { message: 'Không tìm thấy TOKENURI để cập nhật', apiCode: 404 };
            }
        } else {
            console.log('Không có dữ liệu từ URL.');
            return { message: 'Không có dữ liệu từ URL.', apiCode: 404 };
        }
    } catch (error) {
        console.log('Lỗi khi cập nhật TOKENURI:', error.message);
        return { message: 'Lỗi khi cập nhật TOKENURI', apiCode: 500 };
    }
};

const GetTokenURIData = async (tokenURI) => {
    try {
        const result = await db.query(
            'SELECT DATA FROM K20_GameFi_DATN_HCMUS.TOKENURI WHERE TOKENURI = $1',
            [tokenURI]
        );
        if (result.rows.length > 0) {
            const data = result.rows[0].data;
            console.log('Lấy dữ liệu từ TOKENURI thành công');
            return { data, message: 'Lấy dữ liệu từ TOKENURI thành công', apiCode: 200 };
        } else {
            console.log('Không tìm thấy dữ liệu cho TOKENURI:', tokenURI);
            return { message: 'Không tìm thấy dữ liệu cho TOKENURI', apiCode: 404 };
        }
    } catch (error) {
        console.log('Lỗi khi lấy dữ liệu từ TOKENURI:', error.message);
        return { message: 'Lỗi khi lấy dữ liệu từ TOKENURI', apiCode: 500 };
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

    const url = 'https://bb069f0cd1c8ebfa80c6e64868cf1241.ipfscdn.io/ipfs/bafybeiea7xm3gla4bukzglbgbcjjm64qsjlf732segs4d2fbbdry24m2by/104.json';
    // CreateTokenURI(url);
    // UpdateTokenURI(url);
    // GetTokenURIData(url);

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