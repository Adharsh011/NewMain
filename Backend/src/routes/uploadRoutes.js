const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {upload} = require("../config/cloudinary");
const {uploadImage} = require("../controllers/uploadController");

router.post("/",protect,upload.single("image"),uploadImage);

module.exports = router;