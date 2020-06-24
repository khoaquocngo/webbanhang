const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const  Product = require("../services/product");

const router = new Router();

router.get("/", asyncHandler(async function(req, res) {
  const product = await Product.FindAllProduct();
    res.render("index",{product});
  }));


  module.exports = router;