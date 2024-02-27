const express = require("express")
const router = express.Router()
const Room = require("../models/room")
const {
  room,
  getAllrooms,
  addroom,
  deleteroom,
  updateroom,
} = require("../controller/roomController")

router.post("/getroombyid/", room)

router.get("/getallrooms", getAllrooms)

router.post("/addroom", addroom)

router.delete("/deleteroom/:id", deleteroom)

router.patch("/updateroom/:id", updateroom)

module.exports = router
