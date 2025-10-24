const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware"); // ✅ if Option A
const multUpload = require("../controllers/multuploadController");
const vendorProtect = require("../middleware/isVendor");
const { uploadImage } = require("../controllers/uploadController");

// ✅ Multi-image upload (AddProduct)
router.post("/multi", vendorProtect, upload.array("images", 10), multUpload);

// ✅ Single-image upload (profile, etc.)
router.post("/", vendorProtect, upload.single("image"), uploadImage);

module.exports = router;
