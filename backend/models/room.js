const mongoose = require("mongoose")

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: String,
      unique: true,
    },
    maxcount: {
      type: Number,
      required: true,
      default: 1,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
    rentperday: {
      type: Number,
      required: true,
    },
    imageurls: [],
    currentbookings: [],
    type: {
      type: String,
      enum: ["Non-Delux", "Delux"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Room = new mongoose.model("Room", roomSchema)

module.exports = Room
