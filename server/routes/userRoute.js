const express = require("express")
const router = express.Router()
const { register, login, getAllUser } = require("../controller/userController")
const verifyAdmin = require("../utils/verifyToken")

router.post("/register", register)

router.post("/login", login)

router.post("/getallusers", getAllUser)

module.exports = router
