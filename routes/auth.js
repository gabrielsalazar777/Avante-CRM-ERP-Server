const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const saltRounds = 10;

const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/signup", (req, res, next) => {
  const { email, password, fullName, adminKey } = req.body;

  if (email === "" || password === "" || fullName === "") {
    res
      .status(400)
      .json({ message: "Please provide email, password and full name." });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        console.log("line 24", foundUser)
        res.status(400).json({ message: "Email already in use." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      let role = 'Employee'

      if (adminKey === "adminkey") {
         role = "Admin";
      }

      return User.create({ email, password: hashedPassword, fullName, role });
    })
    .then((createdUser) => {
        res.json(createdUser)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});


router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "User not found." });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const { _id, email, fullName, role } = foundUser;

        const payload = {
          _id,
          email,
          fullName,
          role
        };

        const authToken = jwt.sign(payload, process.env.SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        res.status(200).json({ authToken: authToken, user: payload });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});


router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log("req.user", req.user);
  res.status(200).json(req.user);
});

module.exports = router;
