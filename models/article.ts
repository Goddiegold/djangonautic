import {Schema as mongooseSchema, Types, model as mongooseModel} from "mongoose";
import Joi from "joi";

    
const articleSchema = new mongooseSchema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 200,
  },
  body: {
    type: String,
    required: true,
    minlength: 20,
  },

  slug: {
    type: String,
    required:true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },

  owner:{
    type: Types.ObjectId,
    ref:"user",
    required:true,
  },
  author:{
    type:String,
    required:true
  },
  thumb: {
    type: String,
  },
  thumb_id:{
    type:String
  },
  thumb_url:{
type:String,
  },
},{timestamps:true});

export const Article = mongooseModel("articles",articleSchema);

type ArticleType = {
  title:string,
  owner: string,
  author: string,
  body: string,
  slug: string,
  thumb:string
}

export const validateArticle = (article:ArticleType) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
      owner: Joi.string(),
      author: Joi.string(),
    body: Joi.string().min(20).required(),
    slug: Joi.string(),
    thumb:Joi.string(),
  });

  return schema.validate(article);
}

