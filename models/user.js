const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLenght: [3, "must be include atleast 3 charecters"],
    },
    email: {
      type: String,
      match: /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+.){1,}([a-z]{2,16})/,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "must be valid role",
      },
      default: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
