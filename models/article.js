const mongoose = require("mongoose");
const Joi = require("joi");
const { userSchema } = require('./user');


    
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
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
    default: Date.now,
  },

  author: {
    type: String,
    required: true,
  },
  thumb: {
    type: String,
    required:true
  }
});

const Article = mongoose.model("Article",articleSchema);

function validateArticle(article) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
      userId: Joi.objectId().required(),
    author:Joi.string().min(5).max(50).required(),
    body: Joi.string().min(20).required(),
    thumb:Joi.string().required(),
  };

  return Joi.validate(article, schema);
}

exports.Article = Article;
exports.validateArticle = validateArticle;
