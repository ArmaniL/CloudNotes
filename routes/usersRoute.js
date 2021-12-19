require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/Users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const salts = 9;

//login
router.post("/", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    //error handling
    if (err) {
      res.status(502).send({ err });
    } else if (typeof user === "undefined" || user === null) {
      res.status(404).send({ message: "User not Found" });
    }

    //check password
    if (bcrypt.compare(req.body.password, user.password)) {
      const tokenn = jwt.sign({ email: req.body.email }, process.env.SECRET, {
        expiresIn: "1h",
      });
      res.send({ token: tokenn });
    } else {
      res.sendStatus(403);
    }
  });
});

/*
router.post("/", async (req,res)=>{



  (req, res) => {
    User.findOne({ email: req.body.email })
    .lean()
    .exec((err, dbData) => {
      if (err) {
        res.status(502).send({});
      } else if (typeof dbData === "undefined" || dbData === null) {
        res.status(404).send({});
      } else {
        // compare hash with provided password
        bcrypt.compare(req.body.password, dbData.password, (err, match) => {
          if (err) {
            res.status(500).send({}); // TODO: log to some global express log
          }

          if (match) {
            const issuer = "CloudAPI";
            const subject = "Authentication";
            const audience = "User";

            // signing options
            const signOptions = {
              issuer,
              subject,
              audience,
              expiresIn: "12h"
            };

            const token = jwt.sign(
              { id: dbData._id, email: dbData.email },
              config.get("secret"),
              signOptions
            );

            // remove the password field
            delete dbData.password;
            res
            .status(200)
            .json({ code: 200, data: dbData, message: "Succesfully logged in", token: token });
        } else {
          // invalid user data for logging in
          res.status(403).json({});
        }
      });
    }
  });
}


})
*/

//sign up post
router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const valid = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$"
  ).test(password);
  if (!valid) {
    res.send({ message: "password does not meet requirments" });
    return;
  }
  const data = { email: email, password: password };
  //hash password
  bcrypt.hash(data.password, salts, function (err, hash) {
    // Cast incoming data as a Sample.
    console.log(data);
    const user = new User(data);

    // Ignore values submitted by user for system controlled fields.
    user.createdAt = Date.now();
    user.updatedAt = Date.now();
    user.password = hash;
    // Query database
    user.save((err, dbData) => {
      // If error occured, return error respons
      if (err) {
        if (err.name != "ValidationError") {
          console.log(err);

          if (err.keyPattern.hasOwnProperty("email")) {
            problem = "Email already exists";
          }
          res.status(502).send({ Name: err.name, Problem: problem });
        } else {
          res.status(400).send({});
        }
      } else {
        // Return success response
        res.json({ message: "Success" });
      }
    });
  });
});

module.exports = router;
