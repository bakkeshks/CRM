const Customer = require("../models/customerModel");
const Product = require("../models/productModel");
const Sale = require("../models/salesModel");
// GET /reports/sales
exports.getSalesReport = async (req, res) => {
  try {
    let query = {};

    // Check if startDate and endDate are provided in query params
    if (req.query.startDate && req.query.endDate) {
      query.saleDate = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate),
      };
    }

    const sales = await Sale.find(query).populate("customerId productId");
    const totalSales = sales.length;
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const averageSaleAmount = totalSales > 0 ? totalRevenue / totalSales : 0;

    res.status(200).json({
      totalSales,
      totalRevenue,
      averageSaleAmount,
      sales,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /reports/customers
exports.getCustomerReport = async (req, res) => {
  try {
    let query = {};

    // Check if startDate and endDate are provided in query params
    if (req.query.startDate && req.query.endDate) {
      query.createdAt = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate),
      };
    }

    const customers = await Customer.find(query);
    const totalCustomers = customers.length;

    const customerActivities = await Promise.all(
      customers.map(async (customer) => {
        // Count total sales for the customer within the date range
        const totalSales = await Sale.countDocuments({
          customerId: customer._id,
        });
        return {
          customerId: customer._id,
          customerName: customer.name,
          totalSales,
        };
      })
    );

    res.status(200).json({
      totalCustomers,
      customerActivities,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /reports/products
exports.getProductReport = async (req, res) => {
  try {
    const products = await Product.find();
    const totalProducts = products.length;

    res.status(200).json({
      totalProducts,
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
