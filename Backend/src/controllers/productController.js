const Product = require("../model/Product");

// ✅ CREATE PRODUCT (Vendor only)
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, stock, category, images } = req.body;

    const product = await Product.create({
      vendor: req.vendor._id, // from isVendor middleware
      title,
      description,
      price,
      stock,
      category,
      images,
    });

    res.status(201).json({
      message: "✅ Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res
      .status(500)
      .json({ message: "Product creation failed", error: error.message });
  }
};

// ✅ GET ALL PRODUCTS (Public)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("vendor", "shopName");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET PRODUCT BY ID (Public)
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "vendor",
      "shopName"
    );
    if (!product)
      return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE PRODUCT (Vendor only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // Ensure the vendor owns this product
    if (product.vendor.toString() !== req.vendor._id.toString()) {
      return res
        .status(403)
        .json({ message: "Access denied. You are not the product owner." });
    }

    // Update product fields
    Object.assign(product, req.body);
    await product.save();

    res.status(200).json({
      message: "✅ Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE PRODUCT (Vendor only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // Ensure the vendor owns this product
    if (product.vendor.toString() !== req.vendor._id.toString()) {
      return res
        .status(403)
        .json({ message: "Access denied. You are not the product owner." });
    }

    await product.deleteOne();
    res.status(200).json({ message: "🗑️ Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};
