const jwt=require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const Note = require("../models/Note.model")
// middleware that is specific to this router


router.use((req, res, next)=> {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token
  
    jwt.verify(token, process.env.SECRET , (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      console.log("User is "+user)
      req.user = user.email
      next() // pass the execution off to whatever request the client intended
    })
  


})

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })
  // define the home page route
  router.get('/notes', async (req, res, next) => {
    
    const email=req.user
    console.log(email)
    
    try {
      const notes = await Note.find({createdBy:email});
      res.json({result:notes});
    } catch (error) {
      next(error);
    }
  })
  
  router.post("/notes", async(req,res,next)=>{
 

    // Cast incoming data as a Sample.
    const  note = new Note(req.body);

    // Ignore values submitted by user for system controlled fields.
    note.createdAt = Date.now();
    note.updatedAt = Date.now();
    note.createdBy= req.user;
    console.log(note)
    // Query database
    note.save((err, dbData) => {
      // If error occured, return error respons
      if (err) {
        if (err.name != "ValidationError") {
          return res.status(502).send({});
        } else {
          return res.status(400).send({});
        }
      }

      // Return success response
      res.json({
        code: 201,
        data: dbData, 
        message: "Succesfuly saved"
      });
    });


  })

  module.exports = router

