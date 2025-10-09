const Product = require("../model/Product");
const Vendor = require("../model/Vendor");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, stock, category } = req.body;
    const imageUrl = req.file ? req.file.path : req.body.imageUrl || null;

    const vendor = await Vendor.findOne({ user: req.user.id });
    if (!vendor) return res.status(403).json({ message: "Not a vendor" });

    const product = await Product.create({
      vendor: vendor._id,
      title,
      description,
      price,
      stock,
      category,
      imageUrl,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Product creation failed", error: error.message });
  }
};

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("vendor", "shopName");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PRODUCT BY ID
exports.getProductById = async (req, res) => {
  try {
    const productID = await Product.findById(req.params.id).populate("vendor", "shopName");
    if (!productID) return res.status(404).json({ message: "Product not found" });
    res.json(productID);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.user.id });
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product Not Found" });
    if (product.vendor.toString() !== vendor._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.user.id });
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product Not Found" });
    if (product.vendor.toString() !== vendor._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
