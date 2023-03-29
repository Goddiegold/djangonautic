import { RequestHandler } from "express";
import { pick } from "lodash";
import Joi from "joi";
import { User, validateUser } from "../models/user";
import bcrypt from "bcrypt"

export const signup: RequestHandler = async (req, res, next) => {
    //checks for error in req
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checks if user already exists
    let user: any = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already Registered");

    //all values of req.body sent to DB
    user = new User(pick(req.body, ["name", "email", "password"]));

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
}

const validate = (auth: object) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(20).required().email(),
        password: Joi.string().min(5).max(7).required(),
    });

    return schema.validate(auth);
}

export const signin: RequestHandler = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user: any = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");


    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken();
    return res
        .header("auth-token", token)
        .header("access-control-expose-headers", "auth-token")
        .send("Login successfully!")
}


export const profile: RequestHandler = async (req:any, res, next) => {
    const user = await User.findById(req.user._id).select("-password");
    return res.send(user);
}