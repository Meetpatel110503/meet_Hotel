const npmConstants = require("../Constant.js")
const router = npmConstants.express.Router()

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
