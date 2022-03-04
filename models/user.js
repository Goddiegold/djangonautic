const mongoose = require('mongoose');
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  author: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 200,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

 userSchema.methods.generateAuthToken = function () {
   const token = jwt.sign(
     { _id: this._id, author: this.author, email: this.email },
     config.get("jwtPrivateKey")
   );
   return token;
};
 
const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    author: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(200).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.userSchema = userSchema;
exports.validateUser = validateUser;