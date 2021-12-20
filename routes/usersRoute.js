require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Userdao = require("../dao/UserDAO");

const salts = 9;

//login
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const data = { email, password };
  let hash;
  try {
     hash = await new Userdao().find(data);
  } catch (err) {
    //error handling
    if (err) {
      res.status(502).send({ err });
    } else if (typeof user === "undefined" || user === null) {
      res.status(404).send({ message: "User not Found" });
    }

    return;
  }
  //check password
  if (bcrypt.compare(password, hash)) {
    const tokenn = jwt.sign({ email }, process.env.SECRET, {
      expiresIn: "1h",
    });
    res.send({ token: tokenn });
  } else {
    res.sendStatus(403);
  }
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
router.post("/signup", async (req, res) => {
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

  try {
    const hash = await bcrypt.hash(data.password, salts);
    console.log(hash);
    await new Userdao().save(data, hash);

    // Return success response
    res.json({ message: "Success" });
  } catch (err) {
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
    }
  }
});

module.exports = router;
