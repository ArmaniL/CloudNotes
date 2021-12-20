
const User = require("../models/Users.model");

class Userdao{
async save(data,hash){


    const user = new User(data);
    console.log(user)
    // Ignore values submitted by user for system controlled fields.
    user.createdAt = Date.now();
    user.updatedAt = Date.now();
    user.password = hash;
    // Query database
    await user.save();

}

async find(data){
    const {email} = data;
   const user = await User.findOne({ email: email } ); 
   const  {password} = user;

return password;
}}





module.exports = Userdao;