const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/database");
const uploadRoute = require("./src/routes/uploadRoute");
const customerRoutes = require("./src/routes/customerRoutes");
const productRoutes = require("./src/routes/productRoutes");
const salesRoutes = require("./src/routes/saleRoutes");
const quoteRoutes = require("./src/routes/quoteRoutes");

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());

// Routes
app.use("/", uploadRoute); // /upload-csv
app.use("/", customerRoutes); // customer routes
app.use("/", productRoutes); // product routes
app.use("/", salesRoutes); // sales routes
app.use("/", quoteRoutes); // quote routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
