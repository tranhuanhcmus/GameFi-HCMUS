const express = require('express');
const { itemAppOwnerController } = require('../controllers');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ItemAppOwner
 *   description: API for managing item app owners
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemAppOwner:
 *       type: object
 *       required:
 *         - id
 *         - owner
 *         - quantity
 *       properties:
 *         id:
 *           type: string
 *           description: Id of the item app
 *         owner:
 *           type: string
 *           description: Owner of the item app
 *         quantity:
 *           type: integer
 *           description: Quantity of the item app
 */

/**
 * @swagger
 * /itemAppOwners/:
 *   get:
 *     summary: Get list of all item app owners
 *     tags: [ItemAppOwner]
 *     description: Returns a list of all item app owners.
 *     responses:
 *       200:
 *         description: List of item app owners returned successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', itemAppOwnerController.getAll);

/**
 * @swagger
 * /itemAppOwners/:
 *   post:
 *     summary: Add a new item app owner
 *     tags: [ItemAppOwner]
 *     description: Add a new item app owner to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemAppOwner'
 *           examples:
 *             example1:
 *               summary: Example item app owner
 *               value:
 *                  id: "7dc748d5-de7d-4a76-9a58-62463ee7be14"
 *                  owner: "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454"
 *                  quantity: 9999
 *     responses:
 *       200:
 *         description: New item app owner added successfully
 *       404:
 *         description: The provided pair of item and owner already exists in the database
 *       500:
 *         description: Internal server error
 */
router.post('/', itemAppOwnerController.add);

/**
 * @swagger
 * /itemAppOwners/{id}:
 *   get:
 *     summary: Get information of an item app owner by ID
 *     tags: [ItemAppOwner]
 *     description: Returns information of an item app owner based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item app owner to get information.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Information of the item app owner returned successfully
 *       404:
 *         description: No item app owner found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.get('/:id', itemAppOwnerController.getById);

/**
 * @swagger
 * /itemAppOwners/owner/{owner}:
 *   get:
 *     summary: Get information of an item app owner by owner name
 *     tags: [ItemAppOwner]
 *     description: Returns information of an item app owner based on the provided owner name.
 *     parameters:
 *       - in: path
 *         name: owner
 *         required: true
 *         description: Owner name of the item app owner to get information.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Information of the item app owner returned successfully
 *       404:
 *         description: No item app owner found with the provided owner name
 *       500:
 *         description: Internal server error
 */
router.get('/owner/:owner', itemAppOwnerController.getByOwner);

/**
 * @swagger
 * /itemAppOwners/:
 *   put:
 *     summary: Update information of an item app owner by ID
 *     tags: [ItemAppOwner]
 *     description: Update information of an item app owner based on the provided ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemAppOwner'
 *           examples:
 *             example1:
 *               summary: Example item app owner
 *               value:
 *                  id: "7dc748d5-de7d-4a76-9a58-62463ee7be14"
 *                  owner: "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454"
 *                  quantity: 9999
 *     responses:
 *       200:
 *         description: Information of the item app owner updated successfully
 *       404:
 *         description: No item app owner found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.put('/', itemAppOwnerController.updateById);

/**
 * @swagger
 * /itemAppOwners/{id}:
 *   delete:
 *     summary: Delete an item app owner by ID
 *     tags: [ItemAppOwner]
 *     description: Delete an item app owner based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item app owner to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item app owner deleted successfully
 *       404:
 *         description: No item app owner found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', itemAppOwnerController.deleteById);
router.get('/currency/:owner', itemAppOwnerController.getOwnerCurrency);
router.post('/purchase', itemAppOwnerController.purchaseItem);
router.post('/purchasePack', itemAppOwnerController.purchaseItemPack);
router.post('/useItem', itemAppOwnerController.useItemForOwner);

module.exports = router;
