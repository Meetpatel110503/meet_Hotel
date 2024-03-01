const moment = require("moment")
const Booking = require("../models/booking")
const Room = require("../models/room")

const getallbookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
    res.send(bookings)
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

const cancelbooking = async (req, res) => {
  try {
    const { bookingid, roomid } = req.params
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
    return res.status(400).json({ message: error.message })
  }
}

const getbookingbyuserid = async (req, res) => {
  const { id } = req.params
  try {
    let userid = id
    const bookings = await Booking.find({ userid })
    res.send(bookings)
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

const bookroom = async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays } = req.body

  try {
    const newBooking = new Booking({
      roomName: room.name,
      roomid: room._id,
      userid: userid,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      totalamount: "89999",
      totaldays: "9",
    })
  
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
    res.send({ booking: true })
  } catch (e) {
    console.log(e)
  }
}
module.exports = { getallbookings, cancelbooking, getbookingbyuserid, bookroom }
