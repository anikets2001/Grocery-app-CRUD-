const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Product = require("./models/Product");

const app = express();

// setting ejs engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middleware to parse req.body
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

// connecting to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/grocery")
  .then(() => console.log("mongo conenction open"))
  .catch((err) => console.error(err));

// creating routes


// categories for select box 
const categories = [
  "vegetable",
  "fruit",
  "cereal",
  "spice",
  "dairy",
  "cleaning",
];

// homepage(showing all the products)
app.get("/", async (req, res) => {
  const products = await Product.find({});
  res.render("products/products", { products });
});

// creating a new product
app.get("/products/create", (req, res) => {
  res.render("products/create", { categories });
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

// details page of a particular product
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  console.log(product);
  res.render("products/details", { product });
});

// update product
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

// delete a product
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/");
});

// staring the server at port 5000
app.listen(5000, () => {
  console.log("listening on port 5000");
});
