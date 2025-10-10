const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/config/db");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import Routes
const authRoutes = require("./src/routes/authRoutes");
const vendorRoutes = require("./src/routes/vendorRoutes");
const productRoutes = require("./src/routes/productRoutes");
const uploadRoutes = require("./src/routes/uploadRoutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);

// Test Route
app.get("/api/test", (req, res) => {
  res.json({ Message: "API is working... 123 🚀" });
});

// ✅ LOG REGISTERED ROUTES — make sure this is BELOW all `app.use()` calls
if (app._router && app._router.stack) {
  const routes = [];

  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Direct routes
      routes.push(middleware.route.path);
    } else if (middleware.name === "router" && middleware.handle.stack) {
      // Routes from imported routers
      middleware.handle.stack.forEach((handler) => {
        const routePath = handler.route && handler.route.path;
        if (routePath) routes.push(routePath);
      });
    }
  });

  console.log("✅ Registered routes:", routes);
} else {
  console.log("⚠️ No routes registered yet.");
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on PORT ${PORT}`));
