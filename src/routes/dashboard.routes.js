const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middleware");

const {summary,categories,trends,} = require("../controllers/dashboard.controller");

router.get("/summary",authMiddleware,authorize("admin", "analyst","viewer"),summary);
router.get("/categories",authMiddleware,authorize("admin", "analyst","viewer"),categories);
router.get("/trends",authMiddleware,authorize("admin", "analyst","viewer"),trends);

module.exports = router;