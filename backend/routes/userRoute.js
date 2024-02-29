const npmConstants = require("../Constant.js")
const router = npmConstants.express.Router()

const {
  home,
  register,
  login,
  getAllUser,
  deleteUser,
} = require("../controller/userController")
const { verifyUser } = require("../middleware/verifyToken")

router.post("/", home)

router.post("/register", register)

router.post("/login", login)

router.get("/getallusers", getAllUser)

router.delete("/deleteuser/:id", verifyUser, deleteUser)

module.exports = router
