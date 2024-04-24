const express = require('express');
const {  itemAppOwnerController } = require('../controllers');
const router = express.Router();

router.get('/', itemAppOwnerController.getAll);
router.post('/', itemAppOwnerController.add);
router.get('/:id', itemAppOwnerController.getById);
router.get('/owner/:owner', itemAppOwnerController.getByOwner);
router.put('/:id', itemAppOwnerController.updateById);
router.delete('/:id', itemAppOwnerController.deleteById);

module.exports=router