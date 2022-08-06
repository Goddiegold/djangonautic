const express = require("express"),
  router = express.Router();
const { Article, validateArticle } = require("../models/article");
const { User } = require("../models/user");
const multer = require('multer');
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const articles = await Article.find().sort("title");
 return res.send(articles);
});

router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article)
    return res.status(404).send("Article not found");

 return res.send(article);
});


router.post("/", auth, async (req, res) => {
  const { error } = validateArticle(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //  const user = await User.findById(req.body.userId);
  // if (!user) return res.status(400).send("Invalid user");

    function slugify(val) {
      return val
        ?.toString()
        .toLowerCase()
        .trim()
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[\s\W-]+/g, "-"); // Replace spaces, non-word characters and dashes with a single dash (-)
  }
  

  const article = new Article({
    title: req.body.title,
    body: req.body.body,
    author: req.user._id,
    thumb:req.body.thumb,
    slug:slugify(req.body.title)
  });

  await article.save();
 return res.send(article);
});
module.exports = router;
