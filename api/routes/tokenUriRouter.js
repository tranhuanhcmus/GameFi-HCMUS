const express = require('express');
const {  tokenUriController } = require('../controllers');
const router = express.Router();

router.get('/', tokenUriController.getAll);
router.post('/', tokenUriController.add);
router.get('/:id', tokenUriController.getById);
router.put('/:id', tokenUriController.updateById);
router.delete('/:id', tokenUriController.deleteById);

module.exports=router