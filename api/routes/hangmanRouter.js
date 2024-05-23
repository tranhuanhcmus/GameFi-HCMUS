const express = require('express');
const {  hangmanController } = require('../controllers');
const { upload } = require('../multer_config');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Hangman
 *   description: API for managing records
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Hangman:
 *       type: object
 *       required:
 *         - question
 *         - answer
 *       properties:
 *         question:
 *           type: string
 *           description: Question of the game
 *         answer:
 *           type: string
 *           description: Answer of the respective question
 */

/**
 * @swagger
 * /hangmans/:
 *   get:
 *     summary: Get list of all records
 *     tags: [Hangman]
 *     description: Returns a list of all records.
 *     responses:
 *       200:
 *         description: List of records returned successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', hangmanController.getAll);

/**
 * @swagger
 * /hangmans/:
 *   post:
 *     summary: Add a new record
 *     tags: [Hangman]
 *     description: Add a new record to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hangman'
 *           examples:
 *             example1:
 *               summary: Example record
 *               value:
 *                  question: "What is this project name?"
 *                  answer: "GAMEFI"
 *     responses:
 *       200:
 *         description: New record added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', hangmanController.add);

/**
 * @swagger
 * /hangmans/{id}:
 *   get:
 *     summary: Get information of an record by ID
 *     tags: [Hangman]
 *     description: Returns information of an record based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the record to get information.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Information of the record returned successfully
 *       404:
 *         description: No record found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.get('/:id', hangmanController.getById);

/**
 * @swagger
 * /hangmans/:
 *   put:
 *     summary: Update information of an record by ID
 *     tags: [Hangman]
 *     description: Update information of an record based on the provided ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hangman'
 *           examples:
 *             example1:
 *               summary: Example record
 *               value:
 *                  id: "ff11d6c0-0d36-49a7-88c2-33e4e61b6da4"
 *                  question: "What is the chemical symbol for water"
 *                  answer: "H2O"
 *     responses:
 *       200:
 *         description: Information of the record updated successfully
 *       404:
 *         description: No record found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.put('/', hangmanController.updateById);

/**
 * @swagger
 * /hangmans/{id}:
 *   delete:
 *     summary: Delete an record by ID
 *     tags: [Hangman]
 *     description: Delete an record based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the record to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: record deleted successfully
 *       404:
 *         description: No record found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', hangmanController.deleteById);

module.exports = router;
