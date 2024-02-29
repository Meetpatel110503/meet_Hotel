import React, { useState, useEffect } from "react"

import { Tabs } from "antd"
import { useNavigate } from "react-router-dom"
import AdminBookingScreen from "./AdminBookingScreen"
import AdminRoomScreen from "./AdminRoomScreen"
import AdminUserScreen from "./AdminUserScreen"
import AdminAddRoomScreen from "./AdminAddRoomScreen"
import { toast } from "react-toastify"
const { TabPane } = Tabs
function callback(key) {
  console.log(key)
}
function AdminScreen() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("currentUser"))

  useEffect(() => {
    if (!user) {
      navigate("/home")
    }
    if (user.data.details.isAdmin === false) {
      toast.error("sorry you don't have admin access.")
      navigate("/home")
    }
  }, [])

  return (
    <div className='ml-3 mt-3 mr-3 bs'>
      <h1 className='text-center'>Admin Panel</h1>
      <Tabs defaultActiveKey='1' onChange={callback}>
        <TabPane tab='Bookings' key='1'>
          <AdminBookingScreen></AdminBookingScreen>
        </TabPane>
        <TabPane tab='Rooms' key='2'>
          <AdminRoomScreen></AdminRoomScreen>
        </TabPane>
        <TabPane tab='Add Room' key='3'>
          <AdminAddRoomScreen></AdminAddRoomScreen>
        </TabPane>
        <TabPane tab='Users' key='4'>
          <AdminUserScreen></AdminUserScreen>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default AdminScreen
