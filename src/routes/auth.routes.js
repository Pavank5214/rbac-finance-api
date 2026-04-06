const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middleware");
const validate = require("../validators/validate.middleware");

const { registerSchema, loginSchema, updateUserSchema } = require("../validators/auth.validator");


const { register, login, users, updateUser, deleteUser } = require("../controllers/auth.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         role:
 *           type: string
 *           enum: [admin, analyst, viewer]
 *     LoginRequest:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *
 * /auth/login:
 *   post:
 *     summary: Login and get token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *
 * /auth/admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

router.post("/admin/create-user", authMiddleware, authorize("admin"), validate(registerSchema), register);
router.get("/admin/users", authMiddleware, authorize("admin"), users);
router.put("/admin/users/:id", authMiddleware, authorize("admin"), validate(updateUserSchema), updateUser);
router.delete("/admin/users/:id", authMiddleware, authorize("admin"), deleteUser)

module.exports = router;