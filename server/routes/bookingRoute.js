const express = require("express")
const moment = require("moment")
const stripe = require("stripe")("YOUR PRIVATE STRIP API KEY") //
const { v4: uuidv4 } = require("uuid") //https://www.npmjs.com/package/uuid
const router = express.Router()

const Booking = require("../models/booking")
const Room = require("../models/room")
const {getallbookings,cancelbooking,getbookingbyuserid}=require("../controller/bookingController")

router.post("/getallbookings",getallbookings)

router.post("/cancelbooking",cancelbooking)

router.post("/getbookingbyuserid",getbookingbyuserid )

// router.post("/bookroom", async (req, res) => {
//   try {
//     const { room, userid, fromdate, todate, totalAmount, totaldays, token } =
//       req.body;

//     try {
//       //create customer
//       const customer = await stripe.customers.create({
//         email: token.email,
//         source: token.id,
//       });

//       //charge payment
//       const payment = await stripe.charges.create(
//         {
//           amount: totalAmount * 100,
//           customer: customer.id,
//           currency: "USD",
//           receipt_email: token.email,
//         },
//         {
//           idempotencyKey: uuidv4(),
//         }
//       );

//       //Payment Success
//       if (payment) {
//         try {
//           const newBooking = new Booking({
//             room: room.name,
//             roomid: room._id,
//             userid,
//             fromdate: moment(fromdate).format("DD-MM-YYYY"),
//             todate: moment(todate).format("DD-MM-YYYY"),
//             totalamount: totalAmount,
//             totaldays,
//             transactionid: uuidv4(),
//           });

//           const booking = await newBooking.save();

//           const roomTmp = await Room.findOne({ _id: room._id });
//           roomTmp.currentbookings.push({
//             bookingid: booking._id,
//             fromdate: moment(fromdate).format("DD-MM-YYYY"),
//             todate: moment(todate).format("DD-MM-YYYY"),
//             userid: userid,
//             status: booking.status,
//           });

//           await roomTmp.save();
//           res.send("Payment Successful, Your Room is booked");
//         } catch (error) {
//           return res.status(400).json({ message: error });
//         }
//       }
//     } catch (error) {
//       return res.status(400).json({ message: error });
//     }
//   } catch (error) {
//     return res.status(400).json({ message: error });
//   }
// });

router.post("/bookroom", async (req, res) => {
  const {
    room,
    userid,
    fromdate,
    todate,
    totalamount,
    totaldays,
    transactionid,
  } = req.body
  try {
    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid: userid,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      totalamount: 788,
      totaldays: "9",
      transactionid: "878",
    })
    console.log(room._id)
    const booking = await newBooking.save()

    const roomTmp = await Room.findOne({ _id: room._id })
    roomTmp.currentbookings.push({
      bookingid: booking._id,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      userid: userid,
      status: booking.status,
    })
    res.send("Payment Successful, Your Room is booked")
  } catch (e) {
    console.log(e)
  }
})
module.exports = router
