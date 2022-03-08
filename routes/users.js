const _ = require("lodash");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");

// router.get("/me", auth, async (req, res) => {
//   const user = await User.findById(req.user._id).select("-password");
//   res.send(user);
// });

router.post("/", async (req, res) => {
  //checks for error in req
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checks if user already exists
  let user = await User.findOne({email: req.body.email});
  if (user) return res.status(400).send("User already Registered");

  //all values of req.body sent to DB
  user = new User(_.pick(req.body, ["author", "email", "password"]));

  //hashing passwords
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  //returns user's JWT
  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send({
      user: _.pick(user, ["author", "email", "_id"]),
      token,
    })
    // .header("access-control-expose-headers", "x-auth-token");
});

module.exports = router;
