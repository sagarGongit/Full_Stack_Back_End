const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLenght: [3, "must be include atleast 3 charecters"],
  },
  description: { type: String },
  price: { type: Number, required: true, min: [0, "value must be > or = 0"] },
  quantity: {
    type: Number,
    min: [0, "value must be > or = 0"],
    validate: {
      validator: Number.isInteger,
      message: "value must be an integer !",
    },
    default: 0,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const productModel = mongoose.model("Product", ProductSchema);

module.exports = productModel;
