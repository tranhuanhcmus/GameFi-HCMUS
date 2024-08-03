const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// /users
router.get('/energy/:owner',userController.getEnergyOwner)
router.get('/energyNFT/:tokenId',userController.getEnergyNFT)
router.post('/energy/:owner',userController.updateEnergyOwner)
router.post('/contract/updateDB',userController.updateDB)
router.get('checkData/:owner',userController.checkDB)

module.exports = router;