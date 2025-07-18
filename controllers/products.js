const Product = require("../models/model");

// ✅ GET All Products with optional filtering
const getAllProducts = async (req, res) => {
  try {
    const { company, name } = req.query;

    // Filter object
    const filter = {};

    if (company) {
      filter.company = company;
    }

    if (name) {
      filter.name = { $regex: name, $options: "i" }; // case-insensitive search
    }

    const products = await Product.find(filter);

    // Add placeholder images
    const productsWithImages = products.map((p) => ({
      ...p._doc,
      image: `https://via.placeholder.com/400x300?text=${encodeURIComponent(p.name)}`,
    }));

    res.status(200).json(productsWithImages);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllProductsTesting = async (req, res) => {
  res.status(200).json({ msg: "Testing route working ✅" });
};

module.exports = { getAllProducts, getAllProductsTesting };
