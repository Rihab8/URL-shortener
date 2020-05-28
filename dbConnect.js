const mongoose = require("mongoose");

const mongodb = () => {
  mongoose.connect("mongodb://localhost/urls", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection
    .once("open", () => {
      console.log("connected to MongoDB");
    })
    .on("error", (error) => {
      console.error(error);
    });
};
module.exports = mongodb;
