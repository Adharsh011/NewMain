    const express  = require('express');
    const {registerVendor,loginVendor} = require("../controllers/vendorController");
    const vendorProtect = require("../middleware/isVendor") 
    const router = express.Router();


    router.post("/register",registerVendor);
    router.post("/login",loginVendor);
    router.get("/profile", vendorProtect, (req, res) => {
  res.json({
    message: "Vendor Profile",
    vendor: req.vendor,
  });
});

    module.exports = router;

