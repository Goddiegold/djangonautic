import express = require("express");
const router = express.Router();
import { signup, signin, profile } from "../controllers/user"
import { auth } from "../middleware";


router.post("/signup", signup);

router.post("/signin", signin);

router.get("/me", auth, profile);


export default router;
