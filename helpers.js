const path = require("path");
const exphbs = require("express-handlebars");

const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"),
  helpers: {
    cal: (value) => {
      return value + 5;
    },
    url: (value, options) => {
      let i = 0;
      let out = " ";
      value.map((val) => {
        if (value.length - 1 === i) {
          out = out + options.fn(val);
        }
        i++;
      });
      return out;
    },
  },
});
module.exports = hbs;
7;
