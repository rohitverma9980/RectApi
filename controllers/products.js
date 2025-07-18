const Product = require("../models/model");
const getAllProducts = async (req, res) => {
  try {
    const { company, name } = req.query;

    // Filter object
    const filter = {};

    if (company) {
      filter.company = company;
    }

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    const products = await Product.find(filter);

    res.status(200).json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllProductsTesting = async (req, res) => {
  res.status(200).json({ msg: "Testing route working ✅" });
};

module.exports = { getAllProducts, getAllProductsTesting };
