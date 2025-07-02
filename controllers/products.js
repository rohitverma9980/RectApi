const Product = require("../models/model");
const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};
  if (company) {
    queryObject.company = company;
  }

  if (featured) {
    queryObject.featured = featured;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let apiDate = Product.find(queryObject);
  if (sort) {
    let sortFix = sort.split(".").join(" ");
    apiDate = apiDate.sort(sortFix);
  }

  if (select) {
    // let selectFix = select.replace(",", " ");
    let selectFix = select.split(".").join(" ");

    apiDate = apiDate.select(selectFix);
  }
  // let page =Number(req.query.page) || 1;
  // let limit=Number(req.query.limit) || 10;
  // let skip =(page-1)*limit;
  // apiDate = apiDate.skip(skip).limit(limit)

  console.log(queryObject.company);
  try {
    const products = await apiDate;
    res.status(200).json({ products ,nbHits:products.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProductsTesting = async (req, res) => {
  const myDate = await Product.find(req.query);
  res.status(200).json({ myDate });
};

module.exports = { getAllProducts, getAllProductsTesting };
