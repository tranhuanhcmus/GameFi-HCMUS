const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// /users
router.get('/energy/:owner',userController.getEnergyOwner)
router.get('/energyNFT/:tokenId',userController.getEnergyNFT)
router.post('/energy/:owner',userController.updateEnergyOwner)

module.exports = router;