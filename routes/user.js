const express = require("express");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const Authorization = require("../middlewares/authorization");
const blacklistModel = require("../models/blacklist");
const RefreshModel = require("../models/refreshTokens");

// register

userRoute.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(401).json({
        message: "already exist,please login",
      });
    }
    const hashed = await bcrypt.hash(password, 4);
    const newUser = new userModel({ ...req.body, password: hashed });
    await newUser.save();
    res.json({
      message: "user register successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// login

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "invalid mail id user not found",
      });
    }
    bcrypt.compare(password, user.password, (_, result) => {
      if (!result) {
        return res.status(401).json({
          message: "Incorrect credientials",
        });
      }

      var token = jwt.sign(
        { userID: user._id, role: user.role },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      var refreshToken = jwt.sign(
        { userID: user._id, role: user.role },
        process.env.SECRET_KEY1,
        {
          expiresIn: "1d",
        }
      );
      res.json({
        message: "user login successfully",
        token: token,
        refreshToken: refreshToken,
        userid: user._id,
        role: user.role,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//logout

userRoute.post("/logout", Authorization, async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const blacklisted = new blacklistModel({
      Blacklisted_Tokens: token,
    });
    await blacklisted.save();
    res.json({
      message: "logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// token generation

// userRoute.post("/token", async (req, res) => {
//   const refreshToken = await RefreshModel.find()
//     .sort({ Refresh_Tokens: -1 })
//     .limit(1);
//   try {
//     if (!refreshToken) {
//       return res.status(403).json({
//         message: "forbidden",
//       });
//     }
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(401).json({
//           message: "token is expired",
//         });
//       }
//       const accessToken = generateAccessToken({
//         id: user.id,
//         username: user.username,
//       });
//       res.json({ accessToken });
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

module.exports = userRoute;
