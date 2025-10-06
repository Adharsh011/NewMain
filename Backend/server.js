const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const authRoutes = require("./src/routes/authRoutes")
app.use("/api/auth", authRoutes);

app.get('/api/test', (req, res) => {
  res.json({ Message: 'API is working' });
});

const Port = process.env.PORT || 5000;
app.listen(Port, () => console.log(`🚀 Server listening on PORT ${Port}`));
