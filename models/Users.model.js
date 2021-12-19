const  mongoose =require("mongoose")

const Schema = mongoose.Schema;

const SampleSchema = new Schema({
 
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    default: "",
    required: true,
    unique:true,
  },
  password: {
    type: String,
    default: 0
  }
  


});

module.exports= mongoose.model("Users", SampleSchema);