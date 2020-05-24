const mongoose = require("mongoose");
const shortId = require("shortid");
const base = "url-shortener1234.herokuapp.com/";
const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: base + shortId.generate(),
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  time: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
