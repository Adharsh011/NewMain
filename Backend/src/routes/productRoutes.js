const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const isVendor = require("../middleware/isVendor");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Vendor-only product creation
router.post("/", protect, isVendor, createProduct);

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Vendor-protected routes
router.put("/:id", protect, isVendor, updateProduct);
router.delete("/:id", protect, isVendor, deleteProduct);

module.exports = router;
