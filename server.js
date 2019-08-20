const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const app = express();

//config database
const db = require("./config/keys").mongoURI;

//connect to mongoDb through mongooses
mongoose
  //.connect("mongodb://localhost/DEVDB")
  .connect(db)
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

//use router
app.use("/apis/users", users);
app.use("/apis/profile", profile);
app.use("/apis/posts", posts);

//server static asset if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port:${port}`));
