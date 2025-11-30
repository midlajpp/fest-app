const express = require("express");
const router = express.Router();
const {
  getStaticContent,
  updateStaticContent,
} = require("../controllers/staticController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getStaticContent);

router.put("/", protect, admin, updateStaticContent);

module.exports = router;
