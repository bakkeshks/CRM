const express = require("express");
const router = express.Router();
const quoteController = require("../controllers/quoteController");

router.post("/quotes", quoteController.createQuote);
router.get("/quotes", quoteController.getQuotes);
router.get("/quotes/:id", quoteController.getQuoteById);
router.put("/quotes/:id", quoteController.updateQuote);
router.delete("/quotes/:id", quoteController.deleteQuote);
router.post("/quotes/:id/convert", quoteController.convertQuoteToSale);

module.exports = router;
