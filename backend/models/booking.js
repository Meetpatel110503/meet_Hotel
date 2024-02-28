const mongoose = require("mongoose")

const bookingSchema = mongoose.Schema(
  {
    roomName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "booked",
    },
    userid: {
      type: String,
      required: true,
    },
    fromdate: {
      type: String,
      required: true,
    },
    todate: {
      type: String,
      required: true,
    },
    totalamount: {
      type: Number,
      required: true,
    },
    totaldays: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const Booking = new mongoose.model("Booking", bookingSchema)

module.exports = Booking
