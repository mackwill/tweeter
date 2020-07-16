"use strict";

// Basic express setup:

const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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
    email: "thenicolascage@thecage.com",
    password: "the-cage",
  },
  "JonSnow": {
    id: "JonSnow",
    email: "snowyguy@thesnow.com",
    password: "the-snow",
  },
};

// Mount the tweets routes at the "/tweets" path prefix:
app.use("/tweets", tweetsRoutes);

app.get("/login", (req, res) => {
  // console.log("response", req);
  res.render("../views/login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("req body", req.body);
  if (users[username] && users[username].password === password) {
    console.log("Success!");
    res.redirect("/");
  }
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
