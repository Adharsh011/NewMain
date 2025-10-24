// src/routes/productRoutes.js
const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getVendorProducts,
} = require("../controllers/productController");

const vendorProtect = require("../middleware/isVendor");
const router = express.Router();

// 🟢 Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// 🟠 Vendor-protected routes
router.post("/", vendorProtect, createProduct);
router.get("/vendor/my-products", vendorProtect, getVendorProducts);
router.put("/:id", vendorProtect, updateProduct);
router.delete("/:id", vendorProtect, deleteProduct);

module.exports = router;
