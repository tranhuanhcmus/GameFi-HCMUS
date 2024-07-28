const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ContractController } = require('../controllers/ContractController');


// /users
router.get('/energy/:owner',userController.getEnergyOwner)
router.get('/energyNFT/:tokenId',userController.getEnergyNFT)
router.post('/energy/:owner',userController.updateEnergyOwner)
router.get('/contract/updateDB',ContractController.updateDB)

module.exports = router;