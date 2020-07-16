"use strict";

// Basic express setup:

const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["username"],
    maxAge: 60 * 60 * 1000,
  })
);

app.set("view engine", "ejs");

// The in-memory database of tweets. It's a basic object with an array in it.
const db = require("./lib/in-memory-db");

// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:
const DataHelpers = require("./lib/data-helpers.js")(db);

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.
const tweetsRoutes = require("./routes/tweets")(DataHelpers);

const users = {
  "NicolasCageSupreme": {
    id: "NicolasCageSupreme",
    firstName: "Nicolas",
    lastName: "Cage",
    email: "thenicolascage@thecage.com",
    password: bcrypt.hashSync("the-king", saltRounds),
  },
  "JonSnow": {
    id: "JonSnow",
    firstName: "Jon",
    lastName: "Snow",
    email: "snowyguy@thesnow.com",
    password: bcrypt.hashSync("the-snow", saltRounds),
  },
};

// Mount the tweets routes at the "/tweets" path prefix:
app.use("/tweets", tweetsRoutes);

app.get("/login", (req, res) => {
  // console.log("response", req);
  res.render("login");
});

app.get("/", (req, res) => {
  // console.log("response", req);
  console.log("req body", req.body);
  res.render("home-page");
  console.log("get session", req.session);
});

const authenticateUser = (enteredPass, storedPass) => {
  return bcrypt.compareSync(enteredPass, storedPass);
};

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  let templateVars = {};

  if (users[username] === undefined) {
    return;
  }

  if (!authenticateUser(password, users[username].password)) {
    res.statusCode = 403;
    res.render("login");
    templateVars = { user: null, error: "Incorrect Password" };
    console.log("Login Failed!");
    return;
  }
  templateVars = { user: users[username], error: null };
  req.session.username = users[username];
  res.render("home-page", templateVars);
  return;
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
