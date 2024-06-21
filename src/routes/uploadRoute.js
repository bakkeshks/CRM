const express = require("express");
const multer = require("multer");
const csvtojson = require("csvtojson");
const uploadController = require("../controllers/uploadController");

const router = express.Router();
const upload = multer();

router.post(
  "/upload-csv",
  upload.single("csvFile"),
  async (req, res, next) => {
    try {
      // Check if file is uploaded
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Convert CSV to JSON
      const jsonArray = await csvtojson().fromString(
        req.file.buffer.toString()
      );

      // Pass the JSON array to the controller
      req.jsonArray = jsonArray;

      // Continue to the next middleware/controller
      next();
    } catch (err) {
      console.error("Error converting CSV to JSON:", err);
      res.status(500).json({ error: "Error converting CSV to JSON" });
    }
  },
  uploadController.uploadCSV
);

module.exports = router;

// In postman use POST: http://localhost:3000/upload-csv
// and in body select form-data  with Key as csvFile and Value as upload csv file
