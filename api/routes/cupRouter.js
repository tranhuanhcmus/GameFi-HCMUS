const express = require('express');
const { cupController } = require('../controllers');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cup
 *   description: API for managing cups
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cup:
 *       type: object
 *       required:
 *         - owner
 *         - cup
 *       properties:
 *         owner:
 *           type: string
 *           description: Wallet ID of the user
 *         cup:
 *           type: integer
 *           description: Quantity of the cups
 */

/**
 * @swagger
 * /cups/{timePeriod}:
 *   get:
 *     summary: Get sum of cups for all users within a specified time period
 *     tags: [Cup]
 *     description: Returns the sum of cups for all users within a specified time period.
 *     parameters:
 *       - in: path
 *         name: timePeriod
 *         required: true
 *         description: Time period to get the sum of cups (week, month, year).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the sum of cups for the specified time period.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cup'
 *       404:
 *         description: No data found for the specified time period.
 *       500:
 *         description: Internal server error.
 */
router.get('/:timePeriod', cupController.getCupSumByOwner);

/**
 * @swagger
 * /cups/specific:
 *   post:
 *     summary: Get sum of cups for a specific owner within a specified time period
 *     tags: [Cup]
 *     description: Returns the sum of cups for a specific owner within a specified time period.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - owner
 *               - timePeriod
 *             properties:
 *               owner:
 *                 type: string
 *                 description: Wallet ID of the owner
 *               timePeriod:
 *                 type: string
 *                 description: Time period to get the sum of cups (week, month, year)
 *     responses:
 *       200:
 *         description: Successfully retrieved the sum of cups for the specified owner and time period.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cup'
 *       404:
 *         description: No data found for the specified owner and time period.
 *       500:
 *         description: Internal server error.
 */
router.post('/specific', cupController.getCupSumBySpecificOwner);

/**
 * @swagger
 * /cups:
 *   post:
 *     summary: Upsert a cup record
 *     tags: [Cup]
 *     description: Create or update a cup record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cup'
 *     responses:
 *       200:
 *         description: Successfully upserted the cup record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cup'
 *       500:
 *         description: Internal server error.
 */
router.post('/', cupController.upsertCup);

/**
 * @swagger
 * /cups/{id}:
 *   delete:
 *     summary: Delete a cup record by ID
 *     tags: [Cup]
 *     description: Delete a cup record based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cup record to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the cup record.
 *       404:
 *         description: No cup record found with the provided ID.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', cupController.deleteById);

module.exports = router;
