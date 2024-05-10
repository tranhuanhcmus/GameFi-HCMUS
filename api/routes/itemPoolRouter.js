const express = require('express');
const {  itemPoolController } = require('../controllers');
const router = express.Router();

router.get('/', itemPoolController.getAll);
router.post('/', itemPoolController.add);
router.get('/:id', itemPoolController.getById);
router.put('/:id', itemPoolController.updateById);
router.delete('/:id', itemPoolController.deleteById);

module.exports = router;