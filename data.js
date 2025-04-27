const mongoose = require("mongoose");
const Product = require("./models/Product");

// connecting to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/grocery")
  .then(() => console.log("mongo conenction open"))
  .catch((err) => console.error(err));

// our sample products
const products = [
  {
    name: "Potato",
    price: 150,
    category: "vegetable",
  },
  {
    name: "Watermelon",
    price: 100,
    category: "fruit",
  },
  {
    name: "lentil",
    price: 300,
    category: "cereal",
  },
  {
    name: "termaric",
    price: 150,
    category: "spice",
  },
  {
    name: "milk",
    price: 36,
    category: "dairy",
  },
  {
    name: "dishwasher",
    price: 80,
    category: "cleaning",
  },
];

// inserting multiple products to the db at once
Product.insertMany(products)
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
