const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

// GET /reports/sales
router.get("/sales", reportController.getSalesReport);

// GET /reports/customers
router.get("/customers", reportController.getCustomerReport);

// GET /reports/products
router.get("/products", reportController.getProductReport);
// GET /reports/getLast30DaysReport
router.get("/getLast30DaysReport", reportController.getLast30DaysReport);

module.exports = router;
