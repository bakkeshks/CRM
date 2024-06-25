const Customer = require("../models/customerModel");

exports.createCustomer = async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    // Check if email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).send({ message: "Email already exists" });
    }

    const customer = new Customer({ name, email, phone, address });
    await customer.save();

    res.status(201).send(customer);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).send(customers);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getCustomerById = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).send({ message: "Customer not found" });
    }

    res.status(200).send(customer);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const customer = await Customer.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!customer) {
      return res.status(404).send({ message: "Customer not found" });
    }

    res.status(200).send(customer);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return res.status(404).send({ message: "Customer not found" });
    }

    res.status(200).send({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
