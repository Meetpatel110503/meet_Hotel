const express = require("express")
const router = express.Router()
const Room = require("../models/room")
const { room, getAllrooms, addroom } = require("../controller/roomController")

router.post("/getroombyid/", room)

router.get("/getallrooms", getAllrooms)

router.post("/addroom", addroom)

module.exports = router
