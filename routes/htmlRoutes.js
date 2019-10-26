var db = require("../models");

module.exports = function(app) {

app.get("/", function(req, res) {
    db.Article.find({saved:false})
    .then(function(article) {
        res.render("index", {
            Article: article
        });
    })
  });

app.get("/saved", function(req, res) {
    db.Article.find({saved: true})
    .then(function(article) {
        res.render("saved", {
            Article: article
        });
    })
});

app.get("/articles/:id", function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

}