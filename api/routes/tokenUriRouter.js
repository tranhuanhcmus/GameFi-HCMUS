const express = require('express');
const { tokenUriController } = require('../controllers');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: TokenUri
 *   description: API for managing token URIs
 */

/**
 * @swagger
 * /tokenUris/:
 *   get:
 *     summary: Get list of all token URIs
 *     tags: [TokenUri]
 *     description: Returns a list of all token URIs.
 *     responses:
 *       200:
 *         description: List of token URIs returned successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', tokenUriController.getAll);

/**
 * @swagger
 * /tokenUris/:
 *   post:
 *     summary: Add a new token URI
 *     tags: [TokenUri]
 *     description: Add a new token URI to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TokenUri'
 *     responses:
 *       200:
 *         description: New token URI added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', tokenUriController.add);

/**
 * @swagger
 * /tokenUris/{id}:
 *   get:
 *     summary: Get information of a token URI by ID
 *     tags: [TokenUri]
 *     description: Returns information of a token URI based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the token URI to get information.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Information of the token URI returned successfully
 *       404:
 *         description: No token URI found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.get('/:id', tokenUriController.getById);

/**
 * @swagger
 * /tokenUris/{id}:
 *   put:
 *     summary: Update information of a token URI by ID
 *     tags: [TokenUri]
 *     description: Update information of a token URI based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the token URI to update information.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TokenUri'
 *     responses:
 *       200:
 *         description: Information of the token URI updated successfully
 *       404:
 *         description: No token URI found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.put('/:id', tokenUriController.updateById);

/**
 * @swagger
 * /tokenUris/{id}:
 *   delete:
 *     summary: Delete a token URI by ID
 *     tags: [TokenUri]
 *     description: Delete a token URI based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the token URI to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Token URI deleted successfully
 *       404:
 *         description: No token URI found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', tokenUriController.deleteById);

module.exports = router;
