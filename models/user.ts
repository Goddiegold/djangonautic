import { Schema as mongooseSchema, model as mongooseModel } from 'mongoose';
import Joi from "joi";
import jwt from "jsonwebtoken";
import config from "config";

export const userSchema = new mongooseSchema({
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

export const User = mongooseModel('users', userSchema);

type UserRegisterType = {
  name: string,
  email: string,
  password: string
}

export function validateUser(user: UserRegisterType) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
    email: Joi.string().min(5).max(20).required().email(),
    password: Joi.string().min(5).max(7).required(),
  });

  return schema.validate(user);
}

