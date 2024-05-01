const express = require('express');
const {  itemGameOwnerController } = require('../controllers');
const router = express.Router();

router.get('/', itemGameOwnerController.getAll);
router.post('/', itemGameOwnerController.add);
router.get('/:id', itemGameOwnerController.getById);
router.get('/owner/:owner', itemGameOwnerController.getByOwner);
router.put('/:id', itemGameOwnerController.updateById);
router.delete('/:id', itemGameOwnerController.deleteById);

module.exports=router