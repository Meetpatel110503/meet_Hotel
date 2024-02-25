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

const cancelbooking= async (req, res) => {
    const { bookingid, roomid } = req.body
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

const getbookingbyuserid=async (req, res) => {
    const { userid } = req.body
    try {
      const bookings = await Booking.find({ userid: userid })
  
      res.send(bookings)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error })
    }
  }

module.exports={getallbookings,cancelbooking,getbookingbyuserid}