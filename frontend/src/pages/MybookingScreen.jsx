import React, { useState, useEffect } from "react"
import axios from "axios"
import { Tag } from "antd"
import Loader from "../components/Loading"
import Error from "../components/Error"

function MyBookingScreen() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const user = JSON.parse(localStorage.getItem("currentUser"))
  console.log(user.details)

  async function fetchMyAPI() {
    setError("")
    setLoading(true)
    try {
      const response = (
        await axios.get(
          "http://localhost:5000/api/bookings/getbookingbyuserid",
          {
            userid: user.details._id,
          }
        )
      ).data
      setBookings(response)
      console.log(response)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  async function cancelBooking(bookingid, roomid) {
    setError("")
    setLoading(true)
    try {
      const response = (
        await axios.delete("http://localhost:5000/api/bookings/cancelbooking", {
          bookingid,
          roomid,
        })
      ).data
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
        <div className='row justify-content-center'>
          <div className='col-md-6  ml-5'>
            {/* {console.log(bookings)} */}
            {bookings &&
              bookings.map((booking) => {
                return (
                  <div className='bs'>
                    <h1>{booking.room}</h1>
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
                      <div className='text-right'>
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
