const express = require("express");
const path = require("path");
const mongodb = require("./dbConnect");
const helper = require("./helpers");
const routes = require("./routes/routers");

const app = express();

//db
mongodb();
//handlebars
hbs = helper;
//static files
app.use(express.static("public"));
//load view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
//routes
app.use("/", routes);

//server connection
app.listen(process.env.PORT || 3000, () => {
  console.log("Server listening to port ...");
});
