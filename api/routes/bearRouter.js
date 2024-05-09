const express = require('express');
const { bearController } = require('../controllers');
const router = express.Router();

router.post('/breed', bearController.breedBear);

module.exports = router;