const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports = {
  express: express,
  cors: cors,
  cookieParser: cookieParser,
  mongoose: mongoose,
  bcrypt: bcrypt,
  jwt: jwt,
}
