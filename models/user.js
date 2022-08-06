const mongoose = require('mongoose');
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 20,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 20,
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
     { id: this._id, name: this.name, email: this.email },
     config.get("jwtPrivateKey")
   );
   return token;
};
 
const User = mongoose.model('users', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(20).required(),
    email: Joi.string().min(5).max(20).required().email(),
    password: Joi.string().min(5).max(7).required(),
  };

  return Joi.validate(user, schema);
}


module.exports={
  User,userSchema,validateUser
}