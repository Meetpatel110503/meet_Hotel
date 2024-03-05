import React, { useState, useEffect } from "react"
import axios from "axios"
import { Tag } from "antd"
import Loader from "../components/Loading"
import Error from "../components/Error"
import { toast } from "react-toastify"

function MyBookingScreen() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const user = JSON.parse(localStorage.getItem("currentUser"))
  async function fetchMyAPI() {
    setError("")
    setLoading(true)
    try {
      const response = await axios.get(
        `http://localhost:5000/api/bookings/getbookingbyuserid/${user.details._id}`
      )
      setBookings(response.data)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  async function cancelBooking(bookingid, roomid) {
    setError("")
    setLoading(true)
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/bookings/cancelbooking/${bookingid}/${roomid}`
      )
      toast.success("Your room is cancled successfully.")
      setLoading(false)
      fetchMyAPI()
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMyAPI()
  }, [])

  return (
    <div>
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className='row justify-center'>
          <div className='flex items-center justify-center flex-wrap'>
            {bookings &&
              bookings.map((booking) => {
                return (
                  <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700  m-3'>
                    <h1 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                      {booking.roomName}
                    </h1>
                    <p>
                      <b>BookingId:</b> {booking._id}
                    </p>
                    <p>
                      <b>CheckIn:</b> {booking.fromdate}
                    </p>
                    <p>
                      <b>CheckOut:</b> {booking.todate}
                    </p>
                    <p>
                      <b>Amount:</b> {booking.totalamount}
                    </p>
                    <p>
                      <b>Status:</b>{" "}
                      {booking.status === "booked" ? (
                        <Tag color='green'>CONFIRMED</Tag>
                      ) : (
                        <Tag color='red'>CANCELLED</Tag>
                      )}
                    </p>
                    {booking.status === "booked" && (
                      <div>
                        <button
                          className='btn btn-danger'
                          onClick={() => {
                            cancelBooking(booking._id, booking.roomid)
                          }}
                        >
                          Cancel Booking
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}

export default MyBookingScreen
