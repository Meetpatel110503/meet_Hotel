import React, { useState, useEffect } from "react"
import axios from "axios"
import { Table, Tag, Space } from "antd"

import Loader from "../components/Loading"
import Error from "../components/Error"

function AdminRoomScreen() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const columns = [
    {
      title: "roomid",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    { title: "maxcount", dataIndex: "maxcount", key: "maxcount" },
    { title: "phonenumber", dataIndex: "phonenumber", key: "phonenumber" },
    { title: "rentperday", dataIndex: "rentperday", key: "rentperday" },
    { title: "type", dataIndex: "type", key: "type" },
  ]

  async function fetchMyData() {
    setError("")
    setLoading(true)
    try {
      const response = (
        await axios.get("http://localhost:5000/api/rooms/getallrooms")
      ).data
      setRooms(response)
      console.log(response)
    } catch (error) {
      console.log(error)
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
        <>
          <div className='col-md-12'>
            <Table columns={columns} dataSource={rooms} />
          </div>
        </>
      )}
    </div>
  )
}

export default AdminRoomScreen
