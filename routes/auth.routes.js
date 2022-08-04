const router = require("express").Router();

// Handle password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { isAuthenticated } = require("../middleware/jwt.middleware")

// How many rounds should bcrypt run the salt
const saltRounds = 10;
const User = require("../models/User.model");


// 1- FUNCTIONALITY TO SIGN UP
router.post("/signup", (req, res) => {
  const { username, password, address } = req.body;

  if (!username || !password || !address) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your username, password, and address." });
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).json({
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }


  // Check if username exists in the database
  User.findOne({ username }).then((found) => {
    if (found) {
      return res.status(400).json({ errorMessage: "Username already taken." });
    }

    // If user is not found, create new user (by hashing the password) and save it in the DB
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        return User.create({
          username,
          password: hashedPassword,
          address,
        });
      })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage:
              "Username need to be unique. The username you chose is already in use.",
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
  });
});




// 2- FUNCTIONALITY TO LOGIN
router.post("/login", (req, res, next) => {
  const { username, password, address } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your username." });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }


  // Search for the user in the database
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ errorMessage: "Wrong credentials." });
      }

      // If user is found, check if the password matches the one saved in the database
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).json({ errorMessage: "Wrong credentials." });
        }

        // If login is successful, create and sign the token
        const { _id, email, name } = user;
        const payload = { _id, email, name };

        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "6h" }
        );
        return res.status(200).json({ authToken: authToken });
      });
    })

    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      next(err);
    });
});



// Check if token is valid (JWT stored on the client)
router.get("/verify", isAuthenticated, (req, res, next) => {

  // Send back the object with user data previously set as the token payload
  res.json(req.payload);
});

module.exports = router;
