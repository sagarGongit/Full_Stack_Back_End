const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist");

const Authorization = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const blokedToken = await blacklistModel.findOne({
    Blacklisted_Tokens: token,
  });
  if (blokedToken) {
    return res.status(409).json({
      message: "your token is expired please login again",
    });
  }
  try {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "unathorized access denied !",
        });
      }
      if (decoded) {
        req.userID = decoded.userID;
        req.role = decoded.role;
        next();
      }
    });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

module.exports = Authorization;
