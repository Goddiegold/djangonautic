import express from 'express';
const app = express();
import config from "config";
import {connect as mongooseConnect} from "mongoose";
import articles from './routes/articles';
import users from './routes/users';
import cors from "cors";
import Joi from "joi";
import morgan from "morgan"
import routeHistory from 'connect-history-api-fallback';
import path from 'path'
 

 if (!config.get("jwtPrivateKey")) {
   console.error("FATAL ERROR: jwtPrivateKey isn't defined.");
   process.exit(1);
 }
 
 app.use(routeHistory())
app.use(express.static("view"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
}); 

app.use(morgan("dev"))
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.json({limit: '5mb'}));
app.use('/api/articles',articles)
app.use('/api/users',users)

//  mongooseConnect(config.get("db"))
//    .then(() => console.log("Connected to MongoDB, [/^_^/]..."))
//   .catch(err => console.error("Couldn't connect to MongoDB", err));

  mongooseConnect(config.get("db"))
  .then(() => console.log("Connected to MongoDB, [/^_^/]..."))
 .catch(err => console.error("Couldn't connect to MongoDB", err));

  
 

// app.use('/api/auth', auth)


const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`Listening on port ${port} ...`));


