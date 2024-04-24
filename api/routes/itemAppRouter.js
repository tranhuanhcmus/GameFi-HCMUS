const express = require('express');
const {  itemAppController } = require('../controllers');
const router = express.Router();

router.get('/', itemAppController.getAll);
router.post('/', itemAppController.add);
router.get('/:id', itemAppController.getById);
router.put('/:id', itemAppController.updateById);
router.delete('/:id', itemAppController.deleteById);

module.exports=router