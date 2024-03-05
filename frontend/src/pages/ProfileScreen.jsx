import React, { useState, useEffect } from "react"
import { Tabs } from "antd"
import { Tag } from "antd"
import { useNavigate } from "react-router-dom"
import MyBookingScreen from "./MybookingScreen"

const { TabPane } = Tabs

function ProfileScreen() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("currentUser"))

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [])

  return (
    <div className='ml-3 mt-3 '>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Profile' key='1'>
          <div className='flex justify-center'>
            <div className='max-w-xs bg-gray-100 shadow-md p-4 m-5 rounded'>
              <p className='font-bold'>My Profile</p>
              <img
                src='https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=612x612&w=0&k=20&c=s9hO4SpyvrDIfELozPpiB_WtzQV9KhoMUP9R9gVohoU='
                alt='image not found'
                style={{
                  height: "90px",
                  width: "90px",
                  marginInline: "auto",
                }}
                className='p-2 mb-2 border rounded-md'
              />
              <p>Email: {user.details.email}</p>
              <p>Name: {user.details.username}</p>
              <p>
                IsAdmin:{" "}
                {user.details.isAdmin ? (
                  <Tag color='green'>YES</Tag>
                ) : (
                  <Tag color='red'>NO</Tag>
                )}
              </p>
            </div>
          </div>
        </TabPane>
        <TabPane tab='Booking' key='2'>
          <MyBookingScreen />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ProfileScreen
