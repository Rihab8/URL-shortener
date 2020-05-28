var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const open = require("open");
const shortid = require("shortid");
const date = require("../date");
const baseUrl = "127.0.0.1:3000/";

//body parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//bring on Models
let Url = require("../models/url");

let tClicksPh;
let tClicks;
var time = setInterval(async () => {
  const urls = await Url.find();
  urls.map((url) => {
    url.clicksPh = 0;
    url.save();
  });
}, 60000);
router.get("/", async (req, res) => {
  const urls = await Url.find();
  console.log(urls);
  res.render("home", {
    title: "home",
    style: "home.css",
    urls: urls.map((url) => url.toJSON()),
  });
});

// var timer = 0;

//stats
router.get("/stats", async (req, res) => {
  const urls = await Url.find();

  await Url.aggregate(
    [
      {
        $group: {
          _id: null,
          totalClicks: { $sum: "$clicks" },
          totalClicksPh: { $sum: "$clicksPh" },
        },
      },
    ],
    (err, result) => {
      if (err) console.error(err);
      tClicks = result[0].totalClicks;
      tClicksPh = result[0].totalClicksPh;
    }
  );
  res.render("stats", {
    title: "Urls",
    style: "stats.css",
    tClicks,
    tClicksPh,
    urls: urls.map((url) => url.toJSON()),
  });
});
/// adding urls to db
router.post("/", urlencodedParser, (req, res) => {
  code = shortid.generate();
  let url = new Url({
    urlCode: code,
    longUrl: req.body.longUrl,
    shortUrl: baseUrl + code,
    time: date(),
  });
  url.save((err) => {
    if (err) console.error(error);
    else res.redirect("/");
  });
});
router.get(`/${baseUrl}:shortUrl`, async (req, res) => {
  const shortUrl = await Url.findOne({
    shortUrl: baseUrl + req.params.shortUrl,
  });
  // console.log(shortUrl);
  //console.log(shortUrl);
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.clicksPh++;
  shortUrl.lastClick = date();
  shortUrl.save();
  open(shortUrl.longUrl, function (err) {
    if (err) throw err;
  });
  res.redirect("/");
});

router.get("/:shortUrl", async (req, res) => {
  const shortUrl = await Url.findOne({
    shortUrl: baseUrl + req.params.shortUrl,
  });
  //console.log(shortUrl);
  //console.log(shortUrl);
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.clicksPh++;
  shortUrl.lastClick = date();
  shortUrl.save();
  res.redirect(shortUrl.longUrl);
});

module.exports = router;
