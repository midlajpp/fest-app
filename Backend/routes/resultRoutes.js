const express = require("express");
const router = express.Router();
const {
  getPublishedResults,
  createResultEntry,
  publishResult,
  getAllAdminResults,
} = require("../controllers/resultController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getPublishedResults);

router.get("/admin", protect, admin, getAllAdminResults);
router.post("/", protect, admin, createResultEntry);
router.put("/publish/:id", protect, admin, publishResult);

module.exports = router;
