const npmConstants = require("../Constant.js")
const router = npmConstants.express.Router()

const {
  getallbookings,
  cancelbooking,
  getbookingbyuserid,
  bookroom,
} = require("../controller/bookingController")

router.get("/getallbookings", getallbookings)

router.delete("/cancelbooking/:bookingid/:roomid", cancelbooking)

router.get("/getbookingbyuserid/:id", getbookingbyuserid)

router.post("/bookroom", bookroom)

module.exports = router
