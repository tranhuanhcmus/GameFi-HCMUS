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
 * components:
 *   schemas:
 *     TokenUri:
 *       type: object
 *       required:
 *         - id
 *         - tokenUri
 *         - data
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the Token Uri
 *         tokenUri:
 *           type: string
 *           description: Token URI of the Token Uri
 *         data:
 *           type: object
 *           required:
 *             - name
 *             - type
 *             - image
 *             - title
 *             - tokenId
 *             - attributes
 *             - description
 *           properties:
 *             name:
 *               type: string
 *               description: Name of the token
 *             type:
 *               type: string
 *               description: Type of the token
 *             image:
 *               type: string
 *               description: URL of the token image
 *             title:
 *               type: string
 *               description: Title of the token
 *             tokenId:
 *               type: string
 *               description: Token ID
 *             attributes:
 *               type: object
 *               required:
 *                 - element
 *                 - eye
 *                 - fur
 *                 - item
 *               properties:
 *                 element:
 *                   type: integer
 *                   description: Element attribute of the token
 *                 eye:
 *                   type: integer
 *                   description: Epe attribute of the token
 *                 fur:
 *                   type: integer
 *                   description: Fur attribute of the token
 *                 item:
 *                   type: integer
 *                   description: Item attribute of the token
 *             description:
 *               type: string
 *               description: Description of the token
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
 *           example:
 *               tokenUri: "https://bb069f0cd1c8ebfa80c6e64868cf1241.ipfscdn.io/ipfs/bafybeiea7xm3gla4bukzglbgbcjjm64qsjlf732segs4d2fbbdry24m2by/105.json"
 *               data:
 *                  name: "Harry's Dragon"
 *                  type: "NFT"
 *                  image: "https://images.nightcafe.studio/jobs/ZmXUlD3BXhjV4i4wnWka/ZmXUlD3BXhjV4i4wnWka--1--zv5e8.jpg?tr=w-1600,c-at_max"
 *                  title: "Test"
 *                  tokenId: "104"
 *                  attributes:
 *                      element: 0
 *                      eye: 1
 *                      fur: 1
 *                      item: 0
 *                  description: "This is a normal Dragon"
 *     responses:
 *       200:
 *         description: New token URI added successfully
 *       404:
 *         description: The provided Token URI already exists in the database
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
 *           type: string
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
 * /tokenUris/:
 *   put:
 *     summary: Update information of a token URI by ID
 *     tags: [TokenUri]
 *     description: Update information of a token URI based on the provided ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TokenUri'
 *           example:
 *               id: 2
 *               tokenUri: "https://bb069f0cd1c8ebfa80c6e64868cf1241.ipfscdn.io/ipfs/bafybeiea7xm3gla4bukzglbgbcjjm64qsjlf732segs4d2fbbdry24m2by/105.json"
 *               data:
 *                  name: "Harry's Dragon"
 *                  type: "NFT"
 *                  image: "https://images.nightcafe.studio/jobs/ZmXUlD3BXhjV4i4wnWka/ZmXUlD3BXhjV4i4wnWka--1--zv5e8.jpg?tr=w-1600,c-at_max"
 *                  title: "Test"
 *                  tokenId: "104"
 *                  attributes:
 *                      element: 1
 *                      eye: 1
 *                      fur: 1
 *                      item: 1
 *                  description: "This is a normal Dragon"
 *     responses:
 *       200:
 *         description: Information of the token URI updated successfully
 *       404:
 *         description: No token URI found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.put('/', tokenUriController.updateById);

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
 *           type: string
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
