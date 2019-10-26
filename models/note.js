var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  }
});

var Note = mongoose.model("note", NoteSchema);

// Export the Note model
module.exports = Note;
