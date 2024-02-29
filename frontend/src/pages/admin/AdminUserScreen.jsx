import React, { useState, useEffect } from "react"
import axios from "axios"
import { Table, Tag, Space, Button } from "antd"
import { toast } from "react-toastify"
import Loader from "../../components/Loading"
import Error from "../../components/Error"
import { useNavigate } from "react-router-dom"

function AdminUserScreen() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("currentUser"))

  const columns = [
    { title: "userid", dataIndex: "_id", key: "_id" },
    {
      title: "name",
      dataIndex: "username",
      key: "name",
    },
    { title: "email", dataIndex: "email", key: "email" },

    {
      title: "isAdmin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin) => (
        <>
          {isAdmin === true ? (
            <Tag color='green'>YES</Tag>
          ) : (
            <Tag color='red'>NO</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size='middle'>
          <Button onClick={() => deleteUser(record._id)} type='danger'>
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
        await axios.get("http://localhost:5000/api/users/getallusers")
      ).data
      setUsers(response)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  async function deleteUser(id) {
    try {
      await axios.delete(
        `http://localhost:5000/api/users/deleteuser/${id}`,
        user
      )
      fetchMyData()
      toast.success("user deleted successfully.") // Refresh data after deletion
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
        <div className='col-md-12'>
          <Table columns={columns} dataSource={users} />
        </div>
      )}
    </div>
  )
}

export default AdminUserScreen
