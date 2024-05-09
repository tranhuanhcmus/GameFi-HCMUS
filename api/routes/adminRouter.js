const express = require('express');
const { viewController } = require('../controllers');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Homepage of the project
 * /admin/:
 *   get:
 *     tags: [Home]
 *     summary: Show project's homepage
 *     description: Navigate to project's homepage
 */

router.get('/', viewController.home);

module.exports=router