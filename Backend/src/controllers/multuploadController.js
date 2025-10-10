const Product = require("../model/Product");

const multUpload = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Extract Cloudinary URLs from req.files
    const imageUrls = req.files.map((file) => file.path); // file.path contains the Cloudinary URL

    // Find product in DB
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Append new image URLs
    product.images.push(...imageUrls);
    await product.save();

    res.status(200).json({
      message: "Images uploaded to Cloudinary and saved successfully!",
      product,
    });
  } catch (error) {
    console.error("Cloudinary multi-upload error:", error);
    res.status(500).json({
      message: "Cloudinary upload failed",
      error: error.message,
    });
  }
};

module.exports = multUpload;
