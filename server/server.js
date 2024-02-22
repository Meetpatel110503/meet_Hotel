const express = require("express")
const app = express()
const connectDb = require("./db/db")
const roomsRoute = require("./routes/roomRoute")
const usersRoute = require("./routes/userRoute")
const cors = require("cors")
// const bookingRoute = require("./routes/bookingRoute")

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use("/api/rooms", roomsRoute)
app.use("/api/users", usersRoute)
//app.use("/api/bookings", bookingRoute)

const PORT = process.env.PORT || 5000
app.get("/", (req, res) => res.send("Hello Zignuts!"))
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`)
  })
})
