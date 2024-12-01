const express = require("express");
const RoleChecker = require("../middlewares/roleChecker");
const userModel = require("../models/user");
const productModel = require("../models/product");
const adminRoute = express.Router();
adminRoute.use(RoleChecker(["admin"]));

// get users

adminRoute.get("/get-users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json({
      message: "users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// single user

adminRoute.get("/get-users/:id", async (req, res) => {
  const userID = req.params.id;
  try {
    const users = await userModel.findOne({ _id: userID });
    res.json({
      message: "users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// update user

adminRoute.patch("/update-user/:id", async (req, res) => {
  const userID = req.params.id;
  try {
    const Updateduser = await userModel.findByIdAndUpdate(
      {
        _id: userID,
      },
      req.body
    );
    res.json({
      message: "user updated successfully",
      user: Updateduser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// delete users

adminRoute.delete("/delete-user/:id", async (req, res) => {
  const userID = req.params.id;
  try {
    const deleteUser = await userModel.findByIdAndDelete({
      _id: userID,
    });
    res.json({
      message: "user deleted successfully",
      user: deleteUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// update products

adminRoute.put("/update-product/:id", async (req, res) => {
  const productID = req.params.id;
  try {
    const updated = await productModel.findByIdAndUpdate(
      { _id: productID },
      req.body
    );
    res.json({
      message: "product updated successfully",
      products: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// delete products

adminRoute.delete("/delete-product/:id"),
  async (req, res) => {
    const productID = req.params.id;
    try {
      const product = await productModel.findOne({ _id: productID });
      res.json({
        message: "product deleted successfully",
        products: product,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = adminRoute;
