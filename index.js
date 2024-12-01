require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Mongo_Connection = require("./config/db");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const productRoute = require("./routes/product");
const Authorization = require("./middlewares/authorization");
const app = express();

const PORT = process.env.PORT || 3002;

app.use(
  cors({
    origin: `${process.env.BASE_URL}`,
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: "Content-Type/Authorization",
  })
);

app.use(express.json());
app.use("/user", userRoute);
app.use("/admin", Authorization, adminRoute);
app.use("/product", Authorization, productRoute);

app.get("/", (req, res) => {
  res.json({
    message: "health route is tested successfully",
  });
});

app.listen(PORT, () => {
  Mongo_Connection();
  console.log(`your server is live on port ${PORT}`);
});
