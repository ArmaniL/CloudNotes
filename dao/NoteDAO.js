const Note = require("../models/Note.model");

class NoteDao {
  async getNotes(email) {
    const notes = await Note.find({ createdBy: email });
    return notes;
  }

  async save(data) {
    const note = new Note(data);
    // Ignore values submitted by user for system controlled fields.
    note.createdAt = Date.now();
    note.updatedAt = Date.now();
    const { content, header, user } = data;
    note.createdBy = user;
    note.content = content;
    note.header = header;
    console.log(note);
    // Query database
    return await note.save();
  }
}

module.exports = NoteDao;
