const express = require('express');
const {  furPoolController } = require('../controllers');
const router = express.Router();

router.get('/', furPoolController.getAll);
router.post('/', furPoolController.add);
router.get('/:id', furPoolController.getById);
router.put('/:id', furPoolController.updateById);
router.delete('/:id', furPoolController.deleteById);

module.exports = router;