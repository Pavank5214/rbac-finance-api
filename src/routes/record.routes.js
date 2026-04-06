const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middleware");
const validate = require("../validators/validate.middleware");

const { createRecordSchema, updateRecordSchema, getRecordsQuerySchema } = require("../validators/record.validator");

const { createRecord, updateRecord, getRecords, getSingleRecord, deleteRecord } = require("../controllers/record.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Record:
 *       type: object
 *       required:
 *         - amount
 *         - type
 *         - category
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the record
 *         userId:
 *           type: string
 *           description: The owner of the record
 *         amount:
 *           type: number
 *           description: The transaction amount
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           description: Type of transaction
 *         category:
 *           type: string
 *           description: Category of transaction
 *         date:
 *           type: string
 *           format: date
 *           description: Date of transaction
 *         note:
 *           type: string
 *           description: Additional notes
 *         isDeleted:
 *           type: boolean
 *           description: Soft delete status
 */

/**
 * @swagger
 * /records:
 *   post:
 *     summary: Create a new record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Record'
 *     responses:
 *       201:
 *         description: Record created successfully
 *       400:
 *         description: Bad request
 *   get:
 *     summary: Get all records (paginated, filtered, searchable)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [date, amount, createdAt]
 *           default: createdAt
 *     responses:
 *       200:
 *         description: List of records
 *
 * /records/{id}:
 *   get:
 *     summary: Get a single record by id
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record details
 *       404:
 *         description: Record not found
 *   put:
 *     summary: Update a record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Record'
 *     responses:
 *       200:
 *         description: Record updated
 *       404:
 *         description: Record not found
 *   delete:
 *     summary: Soft delete a record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record deleted
 *       404:
 *         description: Record not found
 */

router.post("/", authMiddleware, authorize("admin"), validate(createRecordSchema), createRecord);
router.put("/:id", authMiddleware, authorize("admin"), validate(updateRecordSchema), updateRecord)
router.get("/", authMiddleware, authorize("admin", "analyst"), validate(getRecordsQuerySchema, "query"), getRecords);
router.get("/:id", authMiddleware, authorize("admin", "analyst"), getSingleRecord);
router.delete("/:id", authMiddleware, authorize("admin"), deleteRecord);

module.exports = router;