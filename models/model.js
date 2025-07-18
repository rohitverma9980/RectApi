const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.9,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: String,
    enum: {
      values: [
        "apple",
        "samsung",
        "mi",
        "dell", 
        "hp",
        "lenovo",
        "oneplus",
        "sony",
        "asus",
        "realme",
      ],
      message: `{VALUE} is not supported`,
    },
  },
   image: {
    type: String,
    required: [true, "Product image must be provided"],
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Model", productSchema);
