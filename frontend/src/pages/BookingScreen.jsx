import Loader from "../components/Loading"
import Error from "../components/Error"
import { useEffect, useState } from "react"
import axios from "axios"
import moment from "moment"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const BookingScreen = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [room, setRoom] = useState({})
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalDays, setTotalDays] = useState(0)
  const navigate = useNavigate()
  const params = useParams()
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

        const response = await axios.get(
          `http://localhost:5000/api/rooms/getroombyid/${params.roomid}`
        )
        setRoom(response.data.room)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    fetchMyAPI()
  }, [])

  useEffect(() => {
    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1
    setTotalDays(totaldays)
    setTotalAmount(totalDays * room.price)
  }, [room])

  const bookroom = async () => {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser")).details._id,
      fromdate,
      todate,
      totalAmount: totalAmount,
      totaldays: totalDays,
    }

    try {
      const result = await axios.post(
        "http://localhost:5000/api/bookings/bookroom",
        bookingDetails
      )

      if (result.data.booking) {
        navigate("/home")
      }
      toast.success("room booked successfully")
    } catch (error) {
      setError(error)
    }
  }

  return (
    <>
      <div className='m-5'>
        {loading ? (
          <Loader />
        ) : error.length > 0 ? (
          <Error msg={error} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 bs'>
            <div className='col-md-6'>
              <h1 className='text-3xl font-bold mb-4'>{room.name}</h1>
              <img src={room.imageurls[0]} alt='' className='bigimg' />
            </div>
            <div className='col-md-6'>
              <div className='text-right'>
                <h1 className='text-3xl font-bold'>Booking Details</h1>
                <hr className='my-2' />
                <div className='font-semibold'>
                  <p>From Date: {params.fromdate}</p>
                  <p>To Date: {params.todate}</p>
                  <p>Max Count: {room.maxpeople}</p>
                </div>
              </div>
              <div className='text-right'>
                <h1 className='text-3xl font-bold'>Amount</h1>
                <hr className='my-2' />
                <div className='font-semibold'>
                  <p>Total Days: {totalDays}</p>
                  <p>Rent per day: {room.price}</p>
                  <p>Total Amount: {totalAmount}</p>
                </div>
              </div>
            </div>
            <div className='text-left'>
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
