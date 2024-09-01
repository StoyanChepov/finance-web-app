const express = require("express");
const cookieParser = require("cookie-parser");
const secret = "supersecret";
const cors = require("cors");

function configExpress(app) {
  app.use(cookieParser(secret));
  app.use("/static", express.static("static"));
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
}

module.exports = { configExpress };
