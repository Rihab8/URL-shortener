const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  urlCode: {
    type: String,
  },
  longUrl: {
    type: String,
  },
  shortUrl: {
    type: String,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  time: {
    type: String,
  },
});

module.exports = mongoose.model("Url", urlSchema);
