const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route để lấy thông tin khách hàng
router.get('/user-nft/:owner', userController.userNFTs);

// Route để lấy thông tin của tokenURI
router.post('/uri/get', userController.getTokenURI);
// {
//     "data": {
//         "name": "Harry's Dragon",
//         "type": "NFT",
//         "image": "https://images.nightcafe.studio/jobs/ZmXUlD3BXhjV4i4wnWka/ZmXUlD3BXhjV4i4wnWka--1--zv5e8.jpg?tr=w-1600,c-at_max",
//         "title": "Test",
//         "tokenId": "104",
//         "attributes": {
//             "type": "Dragon"
//         },
//         "description": "This is a normal Dragon"
//     },
//     "message": "Lấy dữ liệu từ TOKENURI thành công",
//     "apiCode": 200
// }

// Route để thêm tokenURI
router.post('/uri/cre', userController.createTokenURI);

// Route để cập nhât tokenURI
router.post('/uri/upd', userController.updateTokenURI);

module.exports = router;