const jwt=require('jsonwebtoken')
const express = require('express')
const router = express.Router()
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
    
    res.json({
      code: 201,
      data: dbData, 
      message: "Succesfuly saved"
    });

  })

  module.exports = router

