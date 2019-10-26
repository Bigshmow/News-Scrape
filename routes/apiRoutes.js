var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {

  // get all articles on home page with axios
  app.get("/api/articles", function (req, res) {
    db.Article.find({})
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // update article to saved state
  app.put("/api/articles/:id", function (req, res) {
    db.Article.updateOne({
        _id: req.params.id
      }, {
        saved: true
      })
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // update article to unsaved state
  app.put("/api/unsave/:id", function (req, res) {
    db.Article.updateOne({
        _id: req.params.id
      }, {
        saved: false
      })
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // scrape new articles from icyveins with axios/cheerio
  app.get("/scrape", function (req, res) {
    axios.get("https://www.icy-veins.com/").then(function (response) {
      var $ = cheerio.load(response.data);

      $(".news_tag_wow").each(function (i, element) {
        var result = {};

        result.title = $(this).children(".text_container").find("a").children(".news_title").text();
        result.link = $(this).find("a").attr("href");
        result.img = $(this).find("img").attr("src");
        result.text = $(this).children(".text_container").children(".news_subtitle_container").children(".news_subtitle").text().substring(0, 175) + "...";

        db.Article.create(result)
          .then(function (dbArticle) {
            console.log(dbArticle);
          })
          .catch(function (err) {
            console.log(err);
          });
      });
    });
  });

  // Route for saving/updating an Article's associated Note
  app.post("/articles/:id", function (req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function (dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({
          _id: req.params.id
        }, {
          note: dbNote._id
        }, {
          new: true
        });
      })
      .then(function (dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

}