const npmConstants = require("../Constant.js")
const router = npmConstants.express.Router()

const {
  getallbookings,
  cancelbooking,
  getbookingbyuserid,
  bookroom,
} = require("../controller/bookingController")
const { verifyAdmin, verifyUser } = require("../middleware/verifyToken")

router.get("/getallbookings", getallbookings)

router.delete("/cancelbooking", verifyUser, cancelbooking)

router.get("/getbookingbyuserid", getbookingbyuserid)

router.post("/bookroom", verifyUser, bookroom)

module.exports = router
