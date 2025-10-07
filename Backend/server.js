const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
const authRoutes = require("./src/routes/authRoutes");
const vendorRoutes = require("./src/routes/vendorRoutes");
const productRoutes = require("./src/routes/productRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/products", productRoutes);

app.get('/api/test', (req, res) => {
  res.json({ Message: 'API is working 🚀' });
});

const Port = process.env.PORT || 5000;
app.listen(Port, () => console.log(`🚀 Server listening on PORT ${Port}`));
