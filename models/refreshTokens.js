const mongoose = require("mongoose");

const RefreshSchema = new mongoose.Schema(
  {
    Refresh_Tokens: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const RefreshModel = mongoose.model("RefreshToken", RefreshSchema);

module.exports = RefreshModel;
