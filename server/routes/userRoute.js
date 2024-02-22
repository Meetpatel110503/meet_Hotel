const express = require("express")
const router = express.Router()
const { register, login, getAllUser } = require("../controller/userController")
const User = require("../models/user")
const verifyAdmin = require("../utils/verifyToken")

router.post("/register",  register)

router.post("/login",  login)

router.post("/getallusers", verifyAdmin, getAllUser)

module.exports = router
