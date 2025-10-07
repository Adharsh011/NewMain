const express  = require('express');
const {createVendor,getMyVendor} = require("../controllers/vendorController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.post("/create",protect,createVendor);
router.get("/me",protect,getMyVendor);

module.exports = router;

