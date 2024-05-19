const express = require('express');
const { itemAppController } = require('../controllers');
const { upload } = require('../multer_config');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ItemApp
 *   description: API for managing item apps
 */

/**
 * @swagger
 * /itemApps/:
 *   get:
 *     summary: Get list of all item apps
 *     tags: [ItemApp]
 *     description: Returns a list of all item apps.
 *     responses:
 *       200:
 *         description: List of item apps returned successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', itemAppController.getAll);

/**
 * @swagger
 * /itemApps/:
 *   post:
 *     summary: Add a new item app
 *     tags: [ItemApp]
 *     description: Add a new item app to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imageFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: New item app added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', upload.single("imageFile"), itemAppController.add);

/**
 * @swagger
 * /itemApps/{id}:
 *   get:
 *     summary: Get information of an item app by ID
 *     tags: [ItemApp]
 *     description: Returns information of an item app based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item app to get information.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Information of the item app returned successfully
 *       404:
 *         description: No item app found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.get('/:id', itemAppController.getById);

/**
 * @swagger
 * /itemApps/{id}:
 *   put:
 *     summary: Update information of an item app by ID
 *     tags: [ItemApp]
 *     description: Update information of an item app based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item app to update information.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemApp'
 *     responses:
 *       200:
 *         description: Information of the item app updated successfully
 *       404:
 *         description: No item app found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.put('/:id', itemAppController.updateById);

/**
 * @swagger
 * /itemApps/{id}:
 *   delete:
 *     summary: Delete an item app by ID
 *     tags: [ItemApp]
 *     description: Delete an item app based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item app to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item app deleted successfully
 *       404:
 *         description: No item app found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', itemAppController.deleteById);

module.exports = router;
