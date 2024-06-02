const express = require('express');
const { itemGameOwnerController } = require('../controllers');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ItemGameOwner
 *   description: API for managing item game owners
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemGameOwner:
 *       type: object
 *       required:
 *         - id
 *         - owner
 *         - quantity
 *       properties:
 *         id:
 *           type: string
 *           description: Id of the item game
 *         owner:
 *           type: string
 *           description: Owner of the item game
 *         quantity:
 *           type: integer
 *           description: Quantity of the item game
 */

/**
 * @swagger
 * /itemGameOwners/:
 *   get:
 *     summary: Get list of all item game owners
 *     tags: [ItemGameOwner]
 *     description: Returns a list of all item game owners.
 *     responses:
 *       200:
 *         description: List of item game owners returned successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', itemGameOwnerController.getAll);

/**
 * @swagger
 * /itemGameOwners/:
 *   post:
 *     summary: Add a new item game owner
 *     tags: [ItemGameOwner]
 *     description: Add a new item game owner to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemGameOwner'
 *           examples:
 *             example1:
 *               summary: Example item game owner
 *               value:
 *                  id: "baebb924-5be9-4a6a-81d5-80fcc5c5ba48"
 *                  owner: "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454"
 *                  quantity: 9999
 *     responses:
 *       200:
 *         description: New item game owner added successfully
 *       404:
 *         description: The provided pair of item and owner already exists in the database
 *       500:
 *         description: Internal server error
 */
router.post('/', itemGameOwnerController.add);

/**
 * @swagger
 * /itemGameOwners/{id}:
 *   get:
 *     summary: Get information of an item game owner by ID
 *     tags: [ItemGameOwner]
 *     description: Returns information of an item game owner based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item game owner to get information.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Information of the item game owner returned successfully
 *       404:
 *         description: No item game owner found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.get('/:id', itemGameOwnerController.getById);

/**
 * @swagger
 * /itemGameOwners/owner/{owner}:
 *   get:
 *     summary: Get information of an item game owner by owner name
 *     tags: [ItemGameOwner]
 *     description: Returns information of an item game owner based on the provided owner name.
 *     parameters:
 *       - in: path
 *         name: owner
 *         required: true
 *         description: Owner name of the item game owner to get information.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Information of the item game owner returned successfully
 *       404:
 *         description: No item game owner found with the provided owner name
 *       500:
 *         description: Internal server error
 */
router.get('/owner/:owner', itemGameOwnerController.getByOwner);

/**
 * @swagger
 * /itemGameOwners/:
 *   put:
 *     summary: Update information of an item game owner by ID
 *     tags: [ItemGameOwner]
 *     description: Update information of an item game owner based on the provided ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemGameOwner'
 *           examples:
 *             example1:
 *               summary: Example item game owner
 *               value:
 *                  id: "baebb924-5be9-4a6a-81d5-80fcc5c5ba48"
 *                  owner: "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454"
 *                  quantity: 9999
 *     responses:
 *       200:
 *         description: Information of the item game owner updated successfully
 *       404:
 *         description: No item game owner found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.put('/', itemGameOwnerController.updateById);

/**
 * @swagger
 * /itemGameOwners/{id}:
 *   delete:
 *     summary: Delete an item game owner by ID
 *     tags: [ItemGameOwner]
 *     description: Delete an item game owner based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item game owner to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item game owner deleted successfully
 *       404:
 *         description: No item game owner found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', itemGameOwnerController.deleteById);
router.post('/purchase', itemGameOwnerController.purchaseItem);

module.exports = router;
