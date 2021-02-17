const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bearerToken = require("express-bearer-token");
const oktaAuth = require("./auth");
const api = require("./api");

var allowlist = [
  "http://localhost:4200",
  "https://rafeeq.heroku.com",
  "https://rafeeq-server.heroku.com",
];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
const port = process.env.PORT || 8080;

const app = express()
  .use(cors(corsOptionsDelegate))
  .use(bodyParser.json())
  .use(bearerToken())
  .use(oktaAuth)
  .use(api());

mongoose
  .connect(
    `mongodb+srv://moussa:Smacher129@gorafeeq.haj78.mongodb.net/db?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database");

    app.listen(port, () => {
      console.log(`Express server listening on port ${port}`);
    });
  });
