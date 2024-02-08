// Importing required modules
require("./connection");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const cors = require("cors");

// Importing route modules
const mainRoutes = require("./Routes/route");
const authRoutes = require("./Routes/auth");
const passRoutes = require("./Routes/pass");
const uplodeRoutes = require("./Routes/uplode");
const jwtpassRoutes = require("./Routes/jwtpass");
const meetRoutes = require("./Routes/meet");
const CraftRoutes = require("./Routes/Craft");
const proRoutes = require("./Routes/pro");
const otpRoutes=require("./Routes/otp");
const mailRoutes =require("./Routes/mail");

// Creating an Express app
const app = express();
const port = process.env.PORT || 4000;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "kha",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = getUserById(id);

  if (user) {
    done(null, user);
  } else {
    done(new Error("User not found"));
  }
});

// Routes setup
app.use("/", mainRoutes);
app.use("/auth", authRoutes);
app.use("/uplode", uplodeRoutes);
app.use("/pass", passRoutes);
app.use("/jwtpass", jwtpassRoutes);
app.use("/meet", meetRoutes);
app.use("/api", CraftRoutes);
app.use("/pro", proRoutes);
app.use("/",otpRoutes)
app.use("/send",mailRoutes)

// Server setup
const IP_ADDRESS = process.env.IP_ADDRESS || "localhost";

app.listen(port, () => {
  console.log(`Server is running on http://${IP_ADDRESS}:${port}`);
});
