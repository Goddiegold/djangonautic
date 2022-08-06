const _ = require("lodash");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");
const Joi = require("joi");

// router.get("/me", auth, async (req, res) => {
//   const user = await User.findById(req.user._id).select("-password");
//   res.send(user);
// });

router.post("/signup", async (req, res) => {
  //checks for error in req
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checks if user already exists
  let user = await User.findOne({email: req.body.email});
  if (user) return res.status(400).send("User already Registered");

  //all values of req.body sent to DB
  user = new User(_.pick(req.body, ["name", "email", "password"]));

  //hashing passwords
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  //returns user's JWT
  const token = user.generateAuthToken();

  return res
    .header("auth-token", token)
    .header("access-control-expose-headers", "auth-token")
    .send("Account created successfully!")
    // .header("access-control-expose-headers", "x-auth-token");
});

router.post("/signin", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");


  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  return res
    .header("auth-token", token)
    .header("access-control-expose-headers", "auth-token")
    .send("Login successfully!")
});

function validate(auth) {
  const schema = {
    email: Joi.string().min(5).max(20).required().email(),
    password: Joi.string().min(5).max(7).required(),
  };

  return Joi.validate(auth, schema);
}

module.exports = router;
