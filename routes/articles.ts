import express from "express";

import { getArticles, addArticle, getArticle } from "../controllers/article";

import { auth, upload } from "../middleware";

const router = express.Router();

router.get("/", getArticles)

router.post("/", [auth, upload.array("thumb", 1)], addArticle)

router.get("/:id", getArticle);

export default router
