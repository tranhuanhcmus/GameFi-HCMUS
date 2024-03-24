const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//====================================NFT====================================//
// Route để lấy thông tin nft khách hàng
router.get('/user-nft/:owner', userController.userNFTs);

// Route để cập nhật owner của nft
router.post('/user-nft/transfer', userController.updateNFTOwner);

// Route để cập nhật exp của nft
router.post('/user-nft/feed', userController.updateNFTExp);


//====================================TOKENURI====================================//
// Route để lấy toàn bộ thông tin của tokenURI
router.post('/uri/getAll', userController.getAllTokenURI);

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


//====================================ItemGame====================================//
// Route để lấy toàn bộ thông tin của ItemGame
router.get('/itg/getAll', userController.getItemGame);

// Route để lấy thông tin của ItemGame
router.post('/itg/get', userController.getItemGameById);

// Route để thêm ItemGame
router.post('/itg/cre', userController.createItemGame);

// Route để cập nhât ItemGame
router.post('/itg/upd', userController.updateItemGame);


//====================================ItemApp====================================//
// Route để lấy toàn bộ thông tin của ItemApp
router.get('/ita/getAll', userController.getItemApp);

// Route để lấy thông tin của ItemApp
router.post('/ita/get', userController.getItemAppById);

// Route để thêm ItemApp
router.post('/ita/cre', userController.createItemApp);

// Route để cập nhât ItemApp
router.post('/ita/upd', userController.updateItemApp);


//====================================ItemGameOwnership====================================//
// Route để lấy thông tin của ItemGameOwnership
router.post('/itgo/get', userController.getItemGameOwnership);

// Route để thêm ItemGameOwnership
router.post('/itgo/cre', userController.createItemGameOwnership);

// Route để cập nhât ItemGameOwnership
router.post('/itgo/upd', userController.updateItemGameOwnership);


//====================================ItemAppOwnership====================================//
// Route để lấy thông tin của ItemAppOwnership
router.post('/itao/get', userController.getItemAppOwnership);

// Route để thêm ItemAppOwnership
router.post('/itao/cre', userController.createItemAppOwnership);

// Route để cập nhât ItemAppOwnership
router.post('/itao/upd', userController.updateItemAppOwnership);
module.exports = router;