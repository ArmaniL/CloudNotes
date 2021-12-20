
const Note = require("../models/Note.model")

export default class NoteDao{

async save(){

    try{
    const  note = new Note(req.body);

    // Ignore values submitted by user for system controlled fields.
    note.createdAt = Date.now();
    note.updatedAt = Date.now();
    note.createdBy= req.user;
    console.log(note)
    // Query database
    await note.save();
    }
    catch(err){
      // If error occured, return error respons
      if (err) {
        if (err.name != "ValidationError") {
          return res.status(502).send({});
        } else {
          return res.status(400).send({});
        }
      }

      // Return success response
    }
}


}