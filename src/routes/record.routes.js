const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middleware");
const validate = require("../validators/validate.middleware");

const {createRecordSchema,updateRecordSchema,getRecordsQuerySchema} = require("../validators/record.validator");

const {createRecord ,updateRecord, getRecords,getSingleRecord,deleteRecord} = require("../controllers/record.controller");

router.post("/",authMiddleware,authorize("admin"), validate(createRecordSchema),createRecord);
router.put("/:id",authMiddleware,authorize("admin"),validate(updateRecordSchema),updateRecord)
router.get("/",authMiddleware,authorize("admin","analyst"), validate(getRecordsQuerySchema, "query"),getRecords);
router.get("/:id", authMiddleware, authorize("admin", "analyst"), getSingleRecord);
router.delete("/:id", authMiddleware, authorize("admin"), deleteRecord);

module.exports = router;