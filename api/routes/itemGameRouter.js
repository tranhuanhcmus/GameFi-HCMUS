const express = require('express');
const {  itemGameController } = require('../controllers');
const { upload } = require('../multer_config');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ItemGame
 *   description: API for managing item games
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemGame:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category
 *         - quality
 *         - quantity
 *         - gemcost
 *         - goldcost
 *         - image
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the item game
 *         description:
 *           type: string
 *           description: Description of the item game
 *         category:
 *           type: string
 *           description: Category of the item game
 *         quality:
 *           type: string
 *           description: Quality of the item game
 *         quantity:
 *           type: integer
 *           description: Quantity of the item game
 *         gemcost:
 *           type: integer
 *           description: Gem cost of the item game
 *         goldcost:
 *           type: integer
 *           description: Gold cost of the item game
 *         image:
 *           type: string
 *           description: Image URL of the item game
 */

/**
 * @swagger
 * /itemGames/:
 *   get:
 *     summary: Get list of all item games
 *     tags: [ItemGame]
 *     description: Returns a list of all item games.
 *     responses:
 *       200:
 *         description: List of item games returned successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', itemGameController.getAll);
router.post('/', upload.single("imageFile"),itemGameController.add);

/**
 * @swagger
 * /itemGames/:
 *   post:
 *     summary: Add a new item game
 *     tags: [ItemGame]
 *     description: Add a new item game to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemGame'
 *           examples:
 *             example1:
 *               summary: Example item game
 *               value:
 *                  name: "API Test"
 *                  description: "API Test"
 *                  category: "Test"
 *                  quality: "Test"
 *                  quantity: 1
 *                  gemcost: 1
 *                  goldcost: 1000
 *                  image: "/uploads/api-test.jpg"
 *     responses:
 *       200:
 *         description: New item game added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', itemGameController.add);

/**
 * @swagger
 * /itemGames/{id}:
 *   get:
 *     summary: Get information of an item game by ID
 *     tags: [ItemGame]
 *     description: Returns information of an item game based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item game to get information.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Information of the item game returned successfully
 *       404:
 *         description: No item game found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.get('/:id', itemGameController.getById);

/**
 * @swagger
 * /itemGames/{id}:
 *   put:
 *     summary: Update information of an item game by ID
 *     tags: [ItemGame]
 *     description: Update information of an item game based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item game to update information.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemGame'
 *           examples:
 *             example1:
 *               summary: Example item game
 *               value:
 *                  id: "baebb924-5be9-4a6a-81d5-80fcc5c5ba48"
 *                  name: "API Test"
 *                  description: "API Test"
 *                  category: "Test"
 *                  quality: "Test"
 *                  quantity: 1
 *                  gemcost: 1
 *                  goldcost: 1000
 *                  image: "/uploads/api-test.jpg"
 *     responses:
 *       200:
 *         description: Information of the item game updated successfully
 *       404:
 *         description: No item game found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.put('/:id', itemGameController.updateById);

/**
 * @swagger
 * /itemGames/{id}:
 *   delete:
 *     summary: Delete an item game by ID
 *     tags: [ItemGame]
 *     description: Delete an item game based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item game to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item game deleted successfully
 *       404:
 *         description: No item game found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', itemGameController.deleteById);

module.exports = router;
