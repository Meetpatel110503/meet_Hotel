const Room = require("../models/room")

const room = async (req, res) => {
  try {
    const roomid = req.body.roomid
    console.log(roomid)
    const room = await Room.findOne({ _id: roomid })
    if (room) {
      return res.status(200).json({ message: "Room found", room: room })
    } else {
      return res.status(404).json({ message: "Room not found" })
    }
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
const addroom = async (req, res) => {
  try {
    const newRoom = req.body
    console.log(req.body)
    const room = new Room()
    room.name = newRoom.name
    room.roomNumber = newRoom.roomNumber
    room.maxpeople = newRoom.maxpeople
    room.phonenumber = newRoom.phonenumber
    room.price = newRoom.price
    room.type = newRoom.type
    room.description = newRoom.description
    room.currentbookings = []
    if (newRoom.imageurl1 && newRoom.imageurl1.length > 0) {
      room.imageurls.push(newRoom.imageurl1)
    }
    if (newRoom.imageurl2 && newRoom.imageurl2.length > 0) {
      room.imageurls.push(newRoom.imageurl2)
    }
    if (newRoom.imageurl3 && newRoom.imageurl3.length > 0) {
      room.imageurls.push(newRoom.imageurl3)
    }

    const result = await room.save()
    res.send(result)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: error })
  }
}

const deleteroom = async (req, res) => {
  try {
    const roomId = req.params.id
    await Room.findByIdAndDelete(roomId)
    res.status(200).send("Room deleted successfully.")
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

const updateroom = async (req, res) => {
  try {
    const roomId = req.params.id
    const updatedRoomData = req.body
    const updatedRoom = await Room.findByIdAndUpdate(roomId, updatedRoomData, {
      new: true,
    })
    res
      .status(200)
      .json({ message: "Room updated successfully", room: updatedRoom })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = { room, getAllrooms, addroom, deleteroom, updateroom }
