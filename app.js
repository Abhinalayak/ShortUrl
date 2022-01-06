const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { UrlModel } = require("./models/shortUrl");

mongoose.connect(
  "mongodb+srv://abhi1:abhi1234@cluster0.bjo8c.mongodb.net/urlShortDB",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  let allUrl = UrlModel.find(function (err, result) {
    res.render("index", {
      urlResult: result,
    });
  });
});

app.post("/create", function (req, res) {
  let urlShort = new UrlModel({
    longUrl: req.body.longurl,
    shortUrl: generateUrl(),
  });

  urlShort.save(function (err, data) {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/:urlId", function (req, res) {
  UrlModel.findOne({ shortUrl: req.params.urlId }, function (err, data) {
    if (err) throw err;
  });
});

app.get("/delete/:id", function (req, res) {
  UrlModel.findByIdAndDelete(
    { _id: req.params.id },
    function (err, deleteData) {
      if (err) throw err;
      res.redirect("/");
    }
  );
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
 
app.listen(port, function() {
  console.log("Server started succesfully");
});   

function generateUrl() {
  var newResult = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;

  for (var i = 0; i < 6; i++) {
    newResult += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return newResult;
}
