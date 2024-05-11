const express = require('express');
const { bearController } = require('../controllers');
const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Bear
//  *   description: API for breeding bears
//  */

// /**
//  * @swagger
//  * /bears/breed:
//  *   post:
//  *     summary: Breed a new bear
//  *     tags: [Bear]
//  *     description: Breed a new bear based on the provided parent bears.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               dad:
//  *                 type: object
//  *                 properties:
//  *                   eye:
//  *                     type: integer
//  *                   fur:
//  *                     type: integer
//  *                   element:
//  *                     type: integer
//  *                   item:
//  *                     type: integer
//  *               mom:
//  *                 type: object
//  *                 properties:
//  *                   eye:
//  *                     type: integer
//  *                   fur:
//  *                     type: integer
//  *                   element:
//  *                     type: integer
//  *                   item:
//  *                     type: integer
//  *     responses:
//  *       200:
//  *         description: New bear bred successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     __eye:
//  *                       type: integer
//  *                     __fur:
//  *                       type: integer
//  *                     __element:
//  *                       type: integer
//  *                     __item:
//  *                       type: integer
//  *                     __name:
//  *                       type: string
//  *                     __rarity:
//  *                       type: string
//  *                     __image:
//  *                       type: string
//  *                 message:
//  *                   type: string
//  *       500:
//  *         description: Internal server error
//  */
router.post('/breed', bearController.breedBear);
router.post('/info', bearController.getBear);

module.exports = router;
