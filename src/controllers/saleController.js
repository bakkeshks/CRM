const Sale = require("../models/salesModel");
const Product = require("../models/productModel");

exports.createSale = async (req, res) => {
  const { customerId, productId, quantity, totalAmount } = req.body;

  try {
    // Validate input data (you should have validation logic here)

    // Find the product to check stock availability
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Check if sufficient stock is available
    if (product.stock < quantity) {
      return res.status(400).send({ message: "Insufficient stock available" });
    }

    // Create a new sale record
    const sale = new Sale({
      customerId,
      productId,
      quantity,
      totalAmount,
      status: "completed",
    });

    // Deduct the quantity sold from the product stock
    product.stock -= quantity;
    await product.save();

    // Save the sale
    await sale.save();

    // Respond with the created sale object
    res.status(201).send(sale);
  } catch (error) {
    // Handle errors
    console.error("Error creating sale:", error);
    res.status(500).send({ message: "Error creating sale" });
  }
};

exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .select("customerId productId quantity totalAmount saleDate status")
      .populate({
        path: "customerId",
        select: "_id name ",
      })
      .populate({
        path: "productId",
        select: "_id name",
      });
    res.status(200).send(sales);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getSaleById = async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await Sale.findById(id)
      .select("customerId productId quantity totalAmount saleDate status")
      .populate({
        path: "customerId",
        select: "_id name ",
      })
      .populate({
        path: "productId",
        select: "_id name",
      });

    if (!sale) {
      return res.status(404).send({ message: "Sale not found" });
    }
    res.status(200).send(sale);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateSale = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const sale = await Sale.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!sale) {
      return res.status(404).send({ message: "Sale not found" });
    }
    res.status(200).send(sale);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteSale = async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await Sale.findByIdAndDelete(id);
    if (!sale) {
      return res.status(404).send({ message: "Sale not found" });
    }
    res.status(200).send({ message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
