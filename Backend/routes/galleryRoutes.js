const express = require("express");
const router = express.Router();
const {
  addGalleryImage,
  updateGalleryImage,
  getAllGalleryImages,
  getPreviewImages,
  upload,
} = require("../controllers/galleryController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getAllGalleryImages);
router.get("/preview", getPreviewImages);

router.post("/", protect, admin, upload.single("image"), addGalleryImage);
router.put("/:id", protect, admin, updateGalleryImage);

module.exports = router;
