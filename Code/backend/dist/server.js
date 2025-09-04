"use strict";

/* Ane' Burger 24565068, 33 */

var express = require("express");
var cors = require("cors");
var path = require('path');
var app = express();
var port = 3000;
app.use(cors());
app.use(express["static"](path.join("frontend/public")));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.post('/api/signup', function (req, res) {
  var _req$body = req.body,
    username = _req$body.username,
    surname = _req$body.surname,
    email = _req$body.email,
    password = _req$body.password;
  console.log("Signup attempt: ", username, surname, email, password);
  res.json({
    success: true,
    message: "User signed in successfully."
  });
});
app.post('/api/login', function (req, res) {
  var _req$body2 = req.body,
    username = _req$body2.username,
    password = _req$body2.password;
  console.log("Login attempt: ", username, password);
  if (username === "test user" && password === "12345@Aa") {
    res.json({
      success: true,
      token: "fake_jwt_token"
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid user credentials."
    });
  }
});
app.get('/api', function (req, res) {
  res.json({
    message: 'Hello from the backend!'
  });
});
app.get('/{*any}', function (req, res) {
  return res.sendFile(path.resolve('frontend', 'public', 'index.html'));
});
app.listen(port, function () {
  console.log("Listening on http://localhost:".concat(port));
});