const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  address: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);

module.exports = Customer;
