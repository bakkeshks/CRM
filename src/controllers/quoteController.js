const Quote = require("../models/quoteModel");
const Sale = require("../models/salesModel");
const Product = require("../models/productModel");

exports.createQuote = async (req, res) => {
  const { customerId, productId, quantity, quotedPrice } = req.body;

  try {
    const quote = new Quote({ customerId, productId, quantity, quotedPrice });
    await quote.save();
    res.status(201).send(quote);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find()
      .populate("customerId")
      .populate("productId");
    res.status(200).send(quotes);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getQuoteById = async (req, res) => {
  const { id } = req.params;

  try {
    const quote = await Quote.findById(id)
      .populate("customerId")
      .populate("productId");
    if (!quote) {
      return res.status(404).send({ message: "Quote not found" });
    }
    res.status(200).send(quote);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateQuote = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const quote = await Quote.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!quote) {
      return res.status(404).send({ message: "Quote not found" });
    }
    res.status(200).send(quote);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteQuote = async (req, res) => {
  const { id } = req.params;

  try {
    const quote = await Quote.findByIdAndDelete(id);
    if (!quote) {
      return res.status(404).send({ message: "Quote not found" });
    }
    res.status(200).send({ message: "Quote deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.convertQuoteToSale = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the quote by ID
    const quote = await Quote.findById(id);
    if (!quote) {
      return res.status(404).send({ message: "Quote not found" });
    }

    // Find the product to check stock availability
    const product = await Product.findById(quote.productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    if (product.stock < quote.quantity) {
      return res.status(400).send({ message: "Insufficient stock" });
    }

    // Create a new sale based on the quote
    const sale = new Sale({
      customerId: quote.customerId,
      productId: quote.productId,
      quantity: quote.quantity,
      totalAmount: quote.quotedPrice,
      saleDate: Date.now(),
      status: "completed",
    });

    // Save the new sale
    await sale.save();

    // Update the stock of the product
    product.stock -= quote.quantity;
    await product.save();

    // Delete the original quote
    await Quote.deleteQuote(id);

    // Respond with the created sale
    res.status(201).send(sale);
  } catch (error) {
    // Handle errors
    console.error("Error converting quote to sale:", error);
    res.status(400).send({ message: "Error converting quote to sale", error });
  }
};
