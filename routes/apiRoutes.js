var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {

    // get all articles on home page with axios
    app.get("/api/articles", function(req, res) {
        db.Article.find({})
          .then(function(dbArticle) {
            res.json(dbArticle);
          })
          .catch(function(err) {
            res.json(err);
          });
      });

    // update article to saved state
    app.put("/api/articles/:id", function(req, res) {
      db.Article.updateOne({ _id: req.params.id }, {saved: true})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
    });

    // update article to unsaved state
    app.put("/api/unsave/:id", function(req, res) {
      db.Article.updateOne({ _id: req.params.id }, {saved: false})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
    });
      
    // scrape new articles from icyveins with axios/cheerio
      app.get("/scrape", function(req, res) {
        axios.get("https://www.icy-veins.com/").then(function(response) {
          var $ = cheerio.load(response.data);
      
          $(".news_tag_wow").each(function(i, element) {
            var result = {};
      
            result.title = $(this).children(".text_container").find("a").children(".news_title").text();
            result.link = $(this).find("a").attr("href");
      
            db.Article.create(result)
              .then(function(dbArticle) {
                console.log(dbArticle);
              })
              .catch(function(err) {
                console.log(err);
              });
          });
              });
      });

    }