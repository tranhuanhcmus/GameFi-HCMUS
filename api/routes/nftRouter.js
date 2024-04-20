const express = require('express');
const { nftController } = require('../controllers');
const router = express.Router();

router.get('/', nftController.getAll);
router.post('/', nftController.add);
router.get('/:id', nftController.getById);
router.put('/:id', nftController.updateById);
router.delete('/:id', nftController.deleteById);

router.get('/owner/:owner', nftController.getALlByOwner);

module.exports=router