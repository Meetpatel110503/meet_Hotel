const express = require("express")
const moment = require("moment")
const router = express.Router()

const Booking = require("../models/booking")
const Room = require("../models/room")
const {
  getallbookings,
  cancelbooking,
  getbookingbyuserid,
  bookroom,
} = require("../controller/bookingController")

router.post("/getallbookings", getallbookings)

router.post("/cancelbooking", cancelbooking)

router.post("/getbookingbyuserid", getbookingbyuserid)

router.post("/bookroom", bookroom)
module.exports = router
