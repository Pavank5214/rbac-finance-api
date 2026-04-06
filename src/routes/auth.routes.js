const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middleware");
const validate = require("../validators/validate.middleware");

const { registerSchema, loginSchema,updateUserSchema} = require("../validators/auth.validator");
  

const {register,login,users,updateUser,deleteUser} = require("../controllers/auth.controller");

router.post("/register",validate(registerSchema),register);
router.post("/login",validate(loginSchema),login);

router.post("/admin/create-user",authMiddleware,authorize("admin"), validate(registerSchema),register);
router.get("/admin/users",authMiddleware,authorize("admin"),users);
router.put("/admin/users/:id",authMiddleware,authorize("admin"),validate(updateUserSchema),updateUser);
router.delete("/admin/users/:id",authMiddleware,authorize("admin"),deleteUser)

module.exports = router;