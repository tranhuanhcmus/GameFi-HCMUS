const express = require('express');
const { itemGameController } = require('../controllers');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ItemGame
 *   description: API for managing item games
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
 *           type: integer
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
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemGame'
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
 *           type: integer
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
