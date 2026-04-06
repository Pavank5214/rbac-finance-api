const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middleware");

const { summary, categories, trends, } = require("../controllers/dashboard.controller");

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get financial summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Financial summary data
 *
 * /dashboard/categories:
 *   get:
 *     summary: Get category-wise breakdown
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category breakdown data
 *
 * /dashboard/trends:
 *   get:
 *     summary: Get financial trends
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Financial trends data
 */

router.get("/summary", authMiddleware, authorize("admin", "analyst", "viewer"), summary);
router.get("/categories", authMiddleware, authorize("admin", "analyst", "viewer"), categories);
router.get("/trends", authMiddleware, authorize("admin", "analyst", "viewer"), trends);

module.exports = router;