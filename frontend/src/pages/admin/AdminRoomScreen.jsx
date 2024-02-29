import React, { useState, useEffect } from "react"
import axios from "axios"
import { Table, Space, Button } from "antd"
import { toast } from "react-toastify"
import Loader from "../../components/Loading"
import Error from "../../components/Error"

function AdminRoomScreen() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const user = JSON.parse(localStorage.getItem("currentUser"))

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
    { title: "maxpeople", dataIndex: "maxpeople", key: "maxpeople" },
    { title: "phonenumber", dataIndex: "phonenumber", key: "phonenumber" },
    { title: "price", dataIndex: "price", key: "price" },
    { title: "type", dataIndex: "type", key: "type" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size='middle'>
          <Button onClick={() => deleteRoom(record._id)} type='danger'>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  async function fetchMyData() {
    setError("")
    setLoading(true)
    try {
      const response = (
        await axios.get("http://localhost:5000/api/rooms/getallrooms")
      ).data
      setRooms(response)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  async function deleteRoom(roomId) {
    try {
      await axios.delete(
        `http://localhost:5000/api/rooms/deleteroom/${roomId}`,
        user
      )
      fetchMyData()
      toast.success("room deleted successfullly.") // Refresh data after deletion
    } catch (error) {
      setError(error.message)
    }
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
