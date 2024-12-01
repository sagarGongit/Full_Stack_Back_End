const mongoose = require("mongoose");

const Mongo_Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = Mongo_Connection;
