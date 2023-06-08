/* eslint-disable prettier/prettier */
import * as Joi from "@hapi/joi"
import { Request_Body_Type } from "./types"


export const validateRequestBody = (data: any, requestType: Request_Body_Type) => {
    console.log("joi-validation-->",data)
    const newArticleSchema = Joi.object({
        title: Joi.string().min(5).required(),
        body: Joi.string().min(5).required()
    })


    switch (requestType) {
        case Request_Body_Type.CREATE_ARTICLE:
            return newArticleSchema.validate(data)

    }
}

export const slugify = (val: string) => {
    return val
        .toString()
        .toLowerCase()
        .trim()
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[\s\W-]+/g, "-"); // Replace spaces, non-word characters and dashes with a single dash (-)
}