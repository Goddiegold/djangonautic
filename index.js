const express = require('express');
const app = express();
const config = require("config");
const mongoose = require("mongoose");
const articles = require('./routes/articles');
const users = require('./routes/users');
const auth = require('./routes/auth');
const cors = require("cors");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
 

 if (!config.get("jwtPrivateKey")) {
   console.error("FATAL ERROR: jwtPrivateKey isn't defined.");
   process.exit(1);
 }
 
 
 mongoose
   .connect(config.get("db"))
   .then(() => console.log("Connected to MongoDB, [/^_^/]..."))
  .catch(err => console.error("Couldn't connect to MongoDB", err));

 app.use(express.urlencoded({ extended: true, limit: "50mb" }));
 app.use(express.json({limit: '50mb'}));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(cors());
app.use('/api/articles',articles)
app.use('/api/users',users)
app.use('/api/auth', auth)


const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`Listening on port ${port} ...`));
