const express = require("express");
const router = express.Router();
const Product = require("../models/model")// मान लो Mongoose मॉडल

// ✅ Products API
router.get("/", async (req, res) => {
  try {
    // DB से products fetch कर लो
    const products = await Product.find({});

    // ✅ हर product में placeholder image जोड़ो
    const productsWithImages = products.map((p) => ({
      ...p._doc, // Mongoose doc को normal JS object में convert करने के लिए
      image: `https://via.placeholder.com/400x300?text=${encodeURIComponent(
        p.name
      )}`,
    }));

    res.json(productsWithImages);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
