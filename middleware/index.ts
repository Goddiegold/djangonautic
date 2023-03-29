import { RequestHandler } from "express"
import jwt from "jsonwebtoken";
import config from "config";
import multer from "multer"
import path from 'path';
import { User } from "../models/user";

export const auth: RequestHandler = async function (req: any, res, next) {
    if (!config.get("requiresAuth")) return next();

    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        const decoded: any = jwt.verify(token, config.get("jwtPrivateKey"));
        const user = await User.findById(decoded.id).select("-password")
        if (!user) return res.status(404).send("User not found")
        req.user = user;
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
};

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    },
})

const uploadMulter = multer({
    storage,
})


export const upload = uploadMulter
