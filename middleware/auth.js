const jwt = require("jsonwebtoken");
const config = require("config");
const {User} = require("../models/user");

module.exports = async function (req, res, next) {
  if (!config.get("requiresAuth")) return next();

  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    const user = await User.findById(decoded.id).select("-password")
    if(!user) return res.status(404).send("User not found")
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
