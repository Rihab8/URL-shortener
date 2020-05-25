const mongoose = require("mongoose");

const mongodb = () => {
  mongoose.connect(
    "mongodb+srv://rkurl:1234@cluster0-tkl3u.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  mongoose.connection
    .once("open", () => {
      console.log("connected to MongoDB");
    })
    .on("error", (error) => {
      console.error(error);
    });
};
module.exports = mongodb;
