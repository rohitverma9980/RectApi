require('dotenv').config();
const connect = require("./db/connect");
const Products = require("./models/model");
const ProductJson = require("./product.json");

const start = async () => {
  try {
    await connect(process.env.MONGODB_URL);
    await Products.create(ProductJson);
    console.log("Nice");
  } catch (error) {
    console.log(error);
  }
};

start();
