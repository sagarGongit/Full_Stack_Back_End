const express = require("express");
const RoleChecker = require("../middlewares/roleChecker");
const productModel = require("../models/product");
const productRoute = express.Router();

// add products

productRoute.post(
  "/add-product",
  RoleChecker(["user", "admin"]),
  async (req, res) => {
    try {
      const newProduct = new productModel({
        ...req.body,
        sellerId: req.userID,
      });
      await newProduct.save();
      res.json({
        message: "product added successfully",
        product: newProduct,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// single product fetching

productRoute.get("/get-products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const products = await productModel.findOne({ _id: productId });
    res.json({
      message: "product fetched successfully",
      products: products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// get products and filter

productRoute.get("/get-products", async (req, res) => {
  const { q, sort, limit = 10, page = 1 } = req.query;
  const options = { limit: parseInt(limit), skip: (page - 1) * limit };
  const query = {};
  if (q) {
    query.title = new RegExp(q, "i");
  }
  if (sort) {
    options.sort = { price: sort == "asc" ? 1 : -1 };
  }

  try {
    const products = await productModel.find(query, null, options);
    const totalProducts = await productModel.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);
    res.json({
      message: "product fetched successfully",
      totalItems: totalProducts,
      totalPages: totalPages,
      currentPage: page,
      products: products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// update products

productRoute.put(
  "/update-product/:id",
  RoleChecker(["user"]),
  async (req, res) => {
    const productID = req.params.id;
    const userId = req.userID;
    try {
      const products = await productModel.findOne({ _id: productID });
      if (products.userID.toString() === userId.toString()) {
        const updated = await productModel.findByIdAndUpdate(
          productID,
          req.body
        );
        res.json({
          message: "product updated successfully",
          products: updated,
        });
      } else {
        res.status(403).json({
          message: "forbidden.access dennied",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// delete products

productRoute.delete(
  "/delete-product/:id",
  RoleChecker(["user"]),
  async (req, res) => {
    const productID = req.params.id;
    const userId = req.userID;
    try {
      const products = await productModel.findOne({ _id: productID });
      if (products.userID.toString() === userId.toString()) {
        const deleted = await productModel.findByIdAndDelete(productID);
        res.json({
          message: "product deleted successfully",
          products: deleted,
        });
      } else {
        res.status(403).json({
          message: "forbidden.access dennied",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = productRoute;
