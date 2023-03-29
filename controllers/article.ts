import { RequestHandler } from "express"
import { Article } from "../models/article"
import { validateArticle } from "../models/article";
import { uploadFile, deleteFile } from "../utils/uploadFile";

export const getArticles: RequestHandler = async (req, res, next) => {
    const articles = await Article.find().sort("title");
    return res.send(articles);
}

export const addArticle: RequestHandler = async (req: any, res, next) => {
    console.log("article upload files-->", req.files)
    const { error } = validateArticle(req.body);
    const file = req.files!.length > 0 ? req.files[0] :
        { path: "", filename: "" }
    if (error) {
        await deleteFile(file.filename)
        return res.status(400).send(error.details[0].message);
    }


    const slugify = (val: string) => {
        return val
            .toString()
            .toLowerCase()
            .trim()
            .replace(/&/g, "-and-") // Replace & with 'and'
            .replace(/[\s\W-]+/g, "-"); // Replace spaces, non-word characters and dashes with a single dash (-)
    }


    try {
        const data: any = await uploadFile(file.path)
        // console.log(data)
        const article = new Article({
            title: req.body.title,
            body: req.body.body,
            author: req.user.name ? req.user.name : "",
            owner: req.user._id,
            thumb: data.secure_url ? data.secure_url : "",
            thumb_id: data.public_id ? data.public_id : "",
            slug: slugify(req.body.title)
        });
        await deleteFile(file.filename)
        await article.save();
        return res.send(article);
    } catch (err) {
        deleteFile(file.filename)
    }


} 

export const getArticle:RequestHandler = async(req,res,next)=>{
    const article = await Article.findById(req.params.id);

  if (!article)
    return res.status(404).send("Article not found");

  return res.send(article);
}