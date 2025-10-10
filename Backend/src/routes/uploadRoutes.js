const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");
const { uploadImage } = require("../controllers/uploadController");
const uploadMult = require("../middleware/uploadMiddleware");
const multUpload = require("../controllers/multuploadController");

// Single image upload to Cloudinary
router.post("/", protect, upload.single("image"), uploadImage);

// Multiple image upload locally
router.post("/multi", uploadMult.array("images", 5), multUpload);

module.exports = router;
