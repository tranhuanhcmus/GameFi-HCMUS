const express = require('express');
const { nftController } = require('../controllers');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: NFT
 *   description: API for managing NFTs
 * /nfts:
 *   get:
 *     summary: Get list of all NFTs
 *     tags: [NFT]
 *     description: Returns a list of all NFTs.
 *     responses:
 *       200:
 *         description: List of NFTs returned successfully
 *       404:
 *         description: No NFT found
 *       500:
 *         description: Internal server error
 */
router.get('/', nftController.getAll);

/**
 * @swagger
 * /nfts:
 *   post:
 *     summary: Add a new NFT
 *     tags: [NFT]
 *     description: Adds a new NFT to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NFT'
 *     responses:
 *       200:
 *         description: New NFT added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', nftController.add);

/**
 * @swagger
 * /nfts/{id}:
 *   get:
 *     summary: Get information of a NFT by ID
 *     tags: [NFT]
 *     description: Returns information of a NFT based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the NFT to get information.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Information of the NFT returned successfully
 *       404:
 *         description: No NFT found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.get('/:id', nftController.getById);

/**
 * @swagger
 * /nfts/{id}:
 *   put:
 *     summary: Update information of a NFT by ID
 *     tags: [NFT]
 *     description: Updates information of a NFT based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the NFT to update information.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NFT'
 *     responses:
 *       200:
 *         description: Information of the NFT updated successfully
 *       404:
 *         description: No NFT found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.put('/:id', nftController.updateById);

/**
 * @swagger
 * /nfts/{id}:
 *   delete:
 *     summary: Delete a NFT by ID
 *     tags: [NFT]
 *     description: Deletes a NFT based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the NFT to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: NFT deleted successfully
 *       404:
 *         description: No NFT found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', nftController.deleteById);

/**
 * @swagger
 * /nfts/owner/{owner}:
 *   get:
 *     summary: Get list of NFTs by owner
 *     tags: [NFT]
 *     description: Returns a list of NFTs owned by a specific owner.
 *     parameters:
 *       - in: path
 *         name: owner
 *         required: true
 *         description: Owner of the NFTs to get list.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of NFTs owned by the specified owner returned successfully
 *       404:
 *         description: No NFTs found for the provided owner
 *       500:
 *         description: Internal server error
 */
router.get('/owner/:owner', nftController.getALlByOwner);

module.exports = router;
