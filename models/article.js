const mongoose = require("mongoose");
const Joi = require("joi");


    
const articleSchema = new mongoose.Schema({
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
    required: true,
  },

  slug: {
    type: String,
    required:true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },

  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true,
  },
  thumb: {
    type: String,
    default:"./assets/default.png"
  }
},{timestamps:true});

const Article = mongoose.model("articles",articleSchema);

function validateArticle(article) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
      author: Joi.objectId().required(),
    body: Joi.string().min(20).required(),
    slug: Joi.string().required(),
    thumb:Joi.string(),
  };

  return Joi.validate(article, schema);
}

module.exports = {
  Article,validateArticle
}