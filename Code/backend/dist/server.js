"use strict";

/* Ane' Burger 24565068, 33 */

var express = require("express");
var path = require('path');
var app = express();
var port = 3000;
app.use(express["static"](path.join("frontend/public")));
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