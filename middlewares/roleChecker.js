const RoleChecker = (specifiedRole) => {
  return (req, res, next) => {
    if (specifiedRole.includes(req.role)) {
      next();
    } else {
      res.status(502).json({
        message: "unathorized access",
      });
    }
  };
};

module.exports = RoleChecker;
