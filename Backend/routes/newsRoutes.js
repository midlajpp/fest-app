const express = require("express");
const router = express.Router();
const newsRoutes = require("./routes/newsRoutes");
const {
  getAllNews,
  getLatestNews,
  addNewsItem,
  updateNewsItem,
  deleteNewsItem,
} = require("../controllers/newsController");
const { protect, admin } = require("../middleware/authMiddleware");

app.use("/api/news", newsRoutes);

router.get("/", getAllNews);
router.get("/latest", getLatestNews);
router.post("/", protect, admin, addNewsItem);
router.put("/:id", protect, admin, updateNewsItem);
router.delete("/:id", protect, admin, deleteNewsItem);

module.exports = router;
