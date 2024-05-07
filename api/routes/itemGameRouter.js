const express = require('express');
const {  itemGameController } = require('../controllers');
const { upload } = require('../multer_config');
const router = express.Router();

router.get('/', itemGameController.getAll);
router.post('/', upload.single("imageFile"),itemGameController.add);
router.get('/:id', itemGameController.getById);
router.put('/:id', itemGameController.updateById);
router.delete('/:id', itemGameController.deleteById);

module.exports=router