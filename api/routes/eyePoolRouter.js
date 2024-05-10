const express = require('express');
const {  eyePoolController } = require('../controllers');
const router = express.Router();

router.get('/', eyePoolController.getAll);
router.post('/', eyePoolController.add);
router.get('/:id', eyePoolController.getById);
router.put('/:id', eyePoolController.updateById);
router.delete('/:id', eyePoolController.deleteById);

module.exports = router;
