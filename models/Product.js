const mongoose = require("mongoose");

// creating schema for product
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ["vegetable", "fruit", "cereal", "spice", "dairy", "cleaning"],
  },
});

// creating model for product
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
