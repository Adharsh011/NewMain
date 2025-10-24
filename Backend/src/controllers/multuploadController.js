const cloudinary = require("../config/cloudinary");

const multUpload = async (req, res) => {
  try {
    // ✅ No need for productId in create flow
    // const { productId } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // ✅ FIX: Add "return" inside .map()
    const uploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: "vendor_products",
      })
    );

    const results = await Promise.all(uploadPromises);

    // ✅ Extract secure URLs
    const urls = results.map((r) => r.secure_url);

    // ✅ Return array of URLs
    res.status(200).json({ urls });
  } catch (error) {
    console.error("Cloudinary multi-upload error:", error);
    res.status(500).json({
      message: "Cloudinary upload failed",
      error: error.message,
    });
  }
};

module.exports = multUpload;
