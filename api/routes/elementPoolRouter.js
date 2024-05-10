const express = require('express');
const {  elementPoolController } = require('../controllers');
const router = express.Router();

router.get('/', elementPoolController.getAll);
router.post('/', elementPoolController.add);
router.get('/:id', elementPoolController.getById);
router.put('/:id', elementPoolController.updateById);
router.delete('/:id', elementPoolController.deleteById);

module.exports = router;