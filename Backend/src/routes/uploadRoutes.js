const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const isVendor = require("../middleware/isVendor");
const { upload } = require("../config/cloudinary");
const { uploadImage } = require("../controllers/uploadController");
const uploadMult = require("../middleware/uploadMiddleware");
const multUpload = require("../controllers/multuploadController");

// Single image upload to Cloudinary (Vendor only)
router.post("/", protect, isVendor, upload.single("image"), uploadImage);

// Multi-image upload to Cloudinary (Vendor only)
router.post("/multi", protect, isVendor, uploadMult.array("images", 5), multUpload);

module.exports = router;
