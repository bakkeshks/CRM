const Sale = require("../models/salesModel");

exports.createSale = async (req, res) => {
  const { customerId, productId, quantity, totalAmount } = req.body;

  try {
    const sale = new Sale({ customerId, productId, quantity, totalAmount });
    await sale.save();
    res.status(201).send(sale);
  } catch (error) {
    res.status(400).send(error);
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
