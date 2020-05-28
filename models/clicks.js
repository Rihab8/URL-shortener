const mongoose = require("mongoose");

const clickSchema = mongoose.Schema({
  tClicks: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Click", clickSchema);
