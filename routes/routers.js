var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const open = require("open");
const shortid = require("shortid");
const date = require("../date");
const baseUrl = "url-shortener1234.herokuapp.com/";

//body parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//bring on Models
let Url = require("../models/url");

router.get("/", async (req, res) => {
  const urls = await Url.find();
  // console.log(urls);
  res.render("home", {
    title: "home",
    style: "home.css",
    urls: urls.map((url) => url.toJSON()),
  });
});
//stats
router.get("/stats", async (req, res) => {
  const urls = await Url.find();
  res.render("stats", {
    title: "Urls",
    style: "stats.css",
    urls: urls.map((url) => url.toJSON()),
  });
});
/// adding urls to db
router.post("/", urlencodedParser, (req, res) => {
  let url = new Url();
  code = shortid.generate();
  url.urlCode = code;
  url.longUrl = req.body.longUrl;
  url.shortUrl = baseUrl + code;
  url.time = date();

  url.save((err) => {
    if (err) console.error(error);
    else res.redirect("/");
  });
});
router.get("/:baseUrl/:shortUrl", async (req, res) => {
  const shortUrl = await Url.findOne({
    shortUrl: baseUrl + req.params.shortUrl,
  });
  // console.log(shortUrl);
  //console.log(shortUrl);
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

//   open(shortUrl.longUrl, function (err) {
//     if (err) throw err;
//   });
  res.redirect(shortUrl.longUrl);
});

router.get("/:shortUrl", async (req, res) => {
  const shortUrl = await Url.findOne({
    shortUrl: baseUrl + req.params.shortUrl,
  });
  //console.log(shortUrl);
  //console.log(shortUrl);
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.longUrl);
});

module.exports = router;
