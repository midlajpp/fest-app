const asyncHandler = require("express-async-handler");
const Gallery = require("../models/GalleryModel");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/gallery");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only images (jpeg, jpg, png) are allowed!"));
    }
  },
});

const updateGalleryImage = asyncHandler(async (req, res) => {
  const { laptopUrl, mobileUrl, isPreview } = req.body;

  const image = await Gallery.findById(req.params.id);

  if (image) {
    image.laptopUrl = laptopUrl || image.laptopUrl;
    image.mobileUrl = mobileUrl || image.mobileUrl;
    image.isPreview = isPreview !== undefined ? isPreview : image.isPreview;

    const updatedImage = await image.save();
    res.json(updatedImage);
  } else {
    res.status(404);
    throw new Error("Image not found");
  }
});

const getAllGalleryImages = asyncHandler(async (req, res) => {
  const images = await Gallery.find({}).sort({ createdAt: -1 });
  res.status(200).json(images);
});

const getPreviewImages = asyncHandler(async (req, res) => {
  const images = await Gallery.find({ isPreview: true })
    .limit(3)
    .sort({ createdAt: -1 });
  res.status(200).json(images);
});

// newone

const addGalleryImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No image file uploaded.");
  }

  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "fest-gallery",
    });

    const uploadedUrl = result.secure_url;

    const laptopUrl = uploadedUrl.replace(
      "/upload/",
      "/upload/w_1920,h_640,c_fill/"
    );

    const mobileUrl = uploadedUrl.replace(
      "/upload/",
      "/upload/w_800,h_800,c_fill/"
    );

    const galleryImage = await Gallery.create({
      laptopUrl,
      mobileUrl,
      isPreview: req.body.isPreview === "true" || false,
    });

    res.status(201).json(galleryImage);
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500);
    throw new Error("Image upload failed.");
  }
});

module.exports = {
  addGalleryImage,
  updateGalleryImage,
  getAllGalleryImages,
  getPreviewImages,
  upload,
};
