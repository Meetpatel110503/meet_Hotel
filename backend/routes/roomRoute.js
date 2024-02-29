const npmConstants = require("../Constant.js")
const router = npmConstants.express.Router()

const {
  room,
  getAllrooms,
  addroom,
  deleteroom,
  updateroom,
} = require("../controller/roomController")
const {
  verifyAdmin,
} = require("../middleware/verifyToken")

router.get("/getroombyid/:id", room)

router.get("/getallrooms", getAllrooms)

router.post("/addroom", addroom)

router.delete("/deleteroom/:id", verifyAdmin, deleteroom)

router.patch("/updateroom/:id", verifyAdmin, updateroom)

module.exports = router
