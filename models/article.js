var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  link: {
    type: String,
    // unique: true,
    required: true
  },
  img: {
    type: String,
    unique: true,
    required: true
  },
  text: {
    type: String,
    unique: true
  },
  saved:{
    type: Boolean,
    default: false
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "note"
  }
});

var Article = mongoose.model("article", ArticleSchema);

// Export the Article model
module.exports = Article;