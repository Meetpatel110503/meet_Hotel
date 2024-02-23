import Loader from "../components/Loading"
import Error from "../components/Error"
import { useEffect, useState } from "react"
import axios from "axios"
import moment from "moment"
import { useNavigate, useParams } from "react-router-dom"

const BookingScreen = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [room, setRoom] = useState({})
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalDays, setTotalDays] = useState(0)
  const navigate = useNavigate()
  const params = useParams()
  console.log(params)
  const fromdate = moment(params.fromdate, "DD-MM-YYYY")
  const todate = moment(params.todate, "DD-MM-YYYY")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    if (!user) {
      navigate("/login")
    }
    async function fetchMyAPI() {
      try {
        setError("")
        setLoading(true)
        const response = await axios.post(
          `http://localhost:5000/api/rooms/getroombyid`,
          {
            roomid: params.roomid,
          }
        )
        setRoom(response.data.room)
      } catch (error) {
        setError(error)
        console.log(error)
      }
      setLoading(false)
    }
    fetchMyAPI()
    // eslint-disable-next-line
  }, [])
  console.log(room)
  console.log(params.fromdate)
  console.log(room)

  useEffect(() => {
    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1
    setTotalDays(totaldays)
    setTotalAmount(totalDays * room.rentperday)
  }, [room])

  const bookroom = async () => {
    const bookingDetails = {
      room,
      roomid: room.id,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalAmount,
      totaldays: totalDays,
      transactionid: "123",
    }
    try {
      const result = await axios.post(
        "http://localhost:5000/api/bookings/bookroom",
        bookingDetails
      )
    } catch (error) {
      setError(error)
    }
  }

  return (
    <>
      <div className='m-5'>
        {loading ? (
          <Loader></Loader>
        ) : error.length > 0 ? (
          <Error msg={error}></Error>
        ) : (
          <div className='row justify-content-center mt-5 bs'>
            <div className='col-md-6'>
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} alt='' className='bigimg' />
            </div>
            <div className='col-md-6'>
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p></p>
                  <p>From Date :{params.fromdate} </p>
                  <p>To Date : {params.todate}</p>
                  <p>Max Count : {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <h1>Amount</h1>
                <hr />
                <b>
                  <p>Total Days :{totalDays}</p>
                  <p>Rent per day : {room.rentperday}</p>
                  <p>Total Amount :{totalAmount} </p>
                </b>
              </div>
            </div>
            <div style={{ float: "left" }}>
              <button className='btn btn-primary' onClick={bookroom}>
                Pay Now
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export default BookingScreen
