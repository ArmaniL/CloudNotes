const  mongoose =require("mongoose")
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String
  },
  content:{
      type:String
  },
  header:{
    type:String
    
  }
});
const model=mongoose.model("Note",NoteSchema)
module.exports=model