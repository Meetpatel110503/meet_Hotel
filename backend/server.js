const npmConstants = require("./Constant.js")
const app = npmConstants.express()
const connectDb = require("./db/db")
const roomsRoute = require("./routes/roomRoute")
const usersRoute = require("./routes/userRoute")
const bookingRoute = require("./routes/bookingRoute")

app.use(npmConstants.express.json())
app.use(npmConstants.cors())
app.use(npmConstants.cookieParser())
app.use(npmConstants.express.urlencoded({ extended: false }))
app.use("/api/rooms", roomsRoute)
app.use("/api/users", usersRoute)
app.use("/api/bookings", bookingRoute)

const PORT = process.env.PORT || 5000
app.get("/", (req, res) => res.send({ msg: "Hello Zignuts!" }))
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`)
  })
})
