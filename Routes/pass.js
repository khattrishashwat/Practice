const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const router = express.Router();
const User = require("../model/signup");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username }).exec();

      
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      
      const isMatch = await user.isValidPassword(password);

      
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password" });
      }

      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Initialize Passport
router.use(passport.initialize());

// Login Route
router.post("/login", passport.authenticate("local"), (req, res) => {
 
  res.json({ message: "Authentication successful" });
});

module.exports = router;
