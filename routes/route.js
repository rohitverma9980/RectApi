const express = require("express");
const router = express.Router();
const Product = require("../models/model"); // ✅ Mongoose model import

// ✅ Products API
router.get("/", async (req, res) => {
  try {
    // DB से products fetch
    const products = await Product.find({});

    // ✅ हर product में dynamic placeholder image जोड़ना
    const productsWithImages = products.map((p) => ({
      ...p._doc, // Mongoose document → plain JS object
      image: `https://via.placeholder.com/400x300?text=${encodeURIComponent(
        p.name || "Product"
      )}`,
    }));

    res.json(productsWithImages);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
