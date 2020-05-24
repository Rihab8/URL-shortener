const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const app = express();
const open = require("open");

mongoose.connect(
  "mongodb+srv://rihab:12345@cluster0-tkl3u.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection
  .once("open", () => {
    console.log("connected");
  })
  .on("error", (error) => {
    console.error(error);
  });

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use("/assets", express.static("assets"));
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("home.ejs", { shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.Url });

  res.redirect("/");
});
app.get("/stats", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("stats.ejs", { shortUrls });
});
app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({
    short: "url-shortener1234.herokuapp.com/" + req.params.shortUrl,
  });
  //console.log(shortUrl);
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();
  open(shortUrl.full, function (err) {
    if (err) throw err;
  });
  res.redirect("/");
});
app.get("/:baseUrl/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({
    short: "url-shortener1234.herokuapp.com/" + req.params.shortUrl,
  });
  //console.log(shortUrl);
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();
  open(shortUrl.full, function (err) {
    if (err) throw err;
  });
  res.redirect("/");
});

app.listen(process.env.PORT || 3000);
