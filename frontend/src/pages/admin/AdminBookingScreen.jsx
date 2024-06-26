import React, { useState, useEffect } from "react"
import axios from "axios"
import { Table, Tag, Space } from "antd"

import Loader from "../../components/Loading"
import Error from "../../components/Error"

function AdminBookingScreen() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const columns = [
    { title: "bookingid", dataIndex: "_id", key: "_id" },
    { title: "roomName", dataIndex: "roomName", key: "roomName" },
    { title: "fromdate", dataIndex: "fromdate", key: "fromdate" },
    { title: "todate", dataIndex: "todate", key: "todate" },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          {status === "booked" ? (
            <Tag color='green'>CONFIRMED</Tag>
          ) : (
            <Tag color='red'>CANCELLED</Tag>
          )}
        </>
      ),
    },
  ]

  async function fetchMyData() {
    setError("")
    setLoading(true)
    try {
      const response = await axios.get(
        "http://localhost:5000/api/bookings/getallbookings"
      )
      setBookings(response.data)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMyData()
  }, [])
  return (
    <div className='row'>
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className='col-md-12'>
          <Table columns={columns} dataSource={bookings} />
        </div>
      )}
    </div>
  )
}

export default AdminBookingScreen
