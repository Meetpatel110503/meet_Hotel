const Room = require("../models/room")

const room = async (req, res) => {
  try {
    const roomid = req.body.roomid
    console.log(roomid)
    const room = await Room.findOne({ _id: roomid })
    res.send(room)
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

const getAllrooms = async (req, res) => {
  try {
    const rooms = await Room.find()
    res.send(rooms)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: error })
  }
}

module.exports = { room, getAllrooms }
