import React, { useState, useEffect } from "react"
import { Tabs } from "antd"
import { useNavigate } from "react-router-dom"
import AdminBookingScreen from "./AdminBookingScreen"
import AdminRoomScreen from "./AdminRoomScreen"
import AdminUserScreen from "./AdminUserScreen"
import AdminAddRoomScreen from "./AdminAddRoomScreen"
import { toast } from "react-toastify"

const { TabPane } = Tabs

function AdminScreen() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("currentUser"))

  useEffect(() => {
    if (!user) {
      navigate("/home")
    }
    if (user.details.isAdmin === false) {
      toast.error("Sorry, you don't have admin access.")
      navigate("/home")
    }
  }, [])

  return (
    <div className='mx-auto max-w-5xl px-4 py-8'>
      <h1 className='text-center text-3xl font-bold mb-8'>Admin Panel</h1>
      <Tabs defaultActiveKey='1' className='bg-white shadow-lg rounded-lg'>
        <TabPane tab='Bookings' key='1'>
          <AdminBookingScreen />
        </TabPane>
        <TabPane tab='Rooms' key='2'>
          <AdminRoomScreen />
        </TabPane>
        <TabPane tab='Add Room' key='3'>
          <AdminAddRoomScreen />
        </TabPane>
        <TabPane tab='Users' key='4'>
          <AdminUserScreen />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default AdminScreen
