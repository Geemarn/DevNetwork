const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

//connect to mongoDb through mongoose
mongoose
  .connect("mongodb://localhost/DEVDB")
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

// config bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import router
const users = require("./routes/apis/users");
const profile = require("./routes/apis/profile");
const posts = require("./routes/apis/posts");

// Passport middleware
app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

app.get("/", (req, res) => res.send("hello"));

//use router
app.use("/apis/users", users);
app.use("/apis/profile", profile);
app.use("/apis/posts", posts);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port:${port}`));
