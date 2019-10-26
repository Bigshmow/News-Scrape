var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title: {
    type: String,
    default: " ",
  },
  body: {
    type: String,
    default: ""
  }
});

var Note = mongoose.model("note", NoteSchema);

// Export the Note model
module.exports = Note;
