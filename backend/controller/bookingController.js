const express = require("express")
const moment = require("moment")
const router = express.Router()
const Booking = require("../models/booking")
const Room = require("../models/room")

const getallbookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
    res.send(bookings)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: error })
  }
}

const cancelbooking = async (req, res) => {
  const { bookingid, roomid } = req.body
  console.log(req.body)
  try {
    const booking = await Booking.findOne({ _id: bookingid })

    booking.status = "cancelled"
    await booking.save()
    const room = await Room.findOne({ _id: roomid })
    const bookings = room.currentbookings
    const temp = bookings.filter((x) => x.bookingid.toString() !== bookingid)
    room.currentbookings = temp
    await room.save()

    res.send("Your booking cancelled successfully")
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: error })
  }
}

const getbookingbyuserid = async (req, res) => {
  const { userid } = req.body
  try {
    const bookings = await Booking.find({ userid: userid })
    res.send(bookings)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: error })
  }
}

const bookroom = async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays } = req.body
  try {
    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid: userid,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      totalamount: "89999",
      totaldays: "9",
      transactionid: "878",
    })
    // console.log(newBooking)
    const booking = await newBooking.save()
    const id = room._id
    const roomTmp = await Room.findById(id)

    roomTmp.currentbookings.push({
      bookingid: booking._id,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      userid: userid,
      status: booking.status,
    })

    const currentbookings = await roomTmp.save()
    //console.log(roomTmp.currentbookings)
    res.send({ booking: true })
  } catch (e) {
    console.log(e)
  }
}
module.exports = { getallbookings, cancelbooking, getbookingbyuserid, bookroom }
