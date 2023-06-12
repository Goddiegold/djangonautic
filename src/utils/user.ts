/* eslint-disable prettier/prettier */
import * as Joi from "@hapi/joi";
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { Request_Body_Type, Account_Type } from "./types"
import { InternalServerErrorException } from "@nestjs/common";


export const validateRequestBody = (data: any, requestType: Request_Body_Type) => {
    console.log("joi-validation-->", data)
    const newArticleSchema = Joi.object({
        title: Joi.string().min(5).required(),
        body: Joi.string().min(5).required()
    })

    const newUserSchema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().email().min(5).required(),
        password: Joi.string().min(5).required()
    })

    const oldUserSchema = Joi.object({
        email: Joi.string().email().min(5).required(),
        password: Joi.string().min(5).required()
    })

    switch (requestType) {
        case Request_Body_Type.CREATE_ARTICLE:
            return newArticleSchema.validate(data)
        case Request_Body_Type.CREATE_USER:
            return newUserSchema.validate(data)
        case Request_Body_Type.USER_LOGIN:
            return oldUserSchema.validate(data)
    }
}

export const validationSchema = Joi.object({
    DATABASE_NAME: Joi.string().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    PRIVATE_KEY: Joi.string().required(),
    ADMIN_KEY: Joi.string().required(),
    USER_KEY: Joi.string().required(),
})

export const generateHashedPassword = async (rawPassword: string) => await bcrypt.hash(rawPassword, 10)

export const comparePasswords = async (rawPassword: string, originalPassword: string) => await bcrypt.compare(rawPassword, originalPassword)

/**generate token for all users */
export const generateAuthToken = (USER_TYPE: Account_Type, userId: string) => {
    console.log("generateAuthToken", { USER_TYPE, userId })
    if (!USER_TYPE || !userId) throw new InternalServerErrorException()
    const jwtService = new JwtService()
    const returnUserDetails = () => {
        switch (USER_TYPE) {
            case Account_Type.USER:
                return { type: Account_Type.USER }
            case Account_Type.ADMIN:
                return { type: Account_Type.ADMIN }
            default:
                return null
        }
    }
    const user = returnUserDetails()
    if (!user) return ""

    return jwtService.sign({ accountType: user.type, id: userId },
        { secret: process.env.PRIVATE_KEY, expiresIn: "7d" })
}

export const slugify = (val: string) => {
    return val
        .toString()
        .toLowerCase()
        .trim()
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[\s\W-]+/g, "-"); // Replace spaces, non-word characters and dashes with a single dash (-)
}