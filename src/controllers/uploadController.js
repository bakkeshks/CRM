const Customer = require("../models/CustomerModel");

exports.uploadCSV = async (req, res) => {
  try {
    // Check if jsonArray is present in req object
    if (!req.jsonArray) {
      return res.status(400).json({ error: "No CSV data found" });
    }

    // Save customers to MongoDB
    const customers = req.jsonArray.map((data) => ({
      name: data.CustomerName.trim(), // Assuming CSV header is 'CustomerName'
    }));

    await Customer.insertMany(customers);

    res.status(201).json({ message: "CSV data saved successfully" });
  } catch (error) {
    console.error("Error saving CSV data to MongoDB:", error);
    res.status(500).json({ error: "Failed to save CSV data" });
  }
};
