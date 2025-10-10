exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: req.file.path, // Cloudinary gives URL here
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};
