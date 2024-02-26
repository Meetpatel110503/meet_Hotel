const express = require("express")
const router = express.Router()
const {
  register,
  login,
  getAllUser,
  deleteuser,
} = require("../controller/userController")
const verifyAdmin = require("../utils/verifyToken")

router.post("/register", register)

router.post("/login", login)

router.post("/getallusers", getAllUser)

router.post("/deleteuser/:id", deleteuser)

module.exports = router
