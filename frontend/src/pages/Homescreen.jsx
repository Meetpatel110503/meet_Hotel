import React, { useState, useEffect } from "react"
import axios from "axios"
import Rooms from "../components/Rooms"
import Loader from "../components/Loading"
import { DatePicker } from "antd"
import moment from "moment"

function Homescreen() {
  const [loading, setLoading] = useState(true)
  const [rooms, setRooms] = useState([])
  const [filterRooms, setFilterRooms] = useState([])
  const [error, setError] = useState("")
  const [fromDate, setFromDate] = useState(moment().toDate())
  const [toDate, setToDate] = useState()
  const [searchKey, setSearchKey] = useState("")
  const [type, setType] = useState("all")

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setError("")
        setLoading(true)
        const response = (
          await axios.get("http://localhost:5000/api/rooms/getallrooms")
        ).data
        setRooms(response)
        setFilterRooms(response)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    fetchMyAPI()
  }, [])

  function filterByDate(dates) {
    try {
      setFromDate(moment(dates[0].$d).format("DD-MM-YYYY"))
      setToDate(moment(dates[1].$d).format("DD-MM-YYYY"))
    } catch (error) {}
  }

  function filterBySearch() {
    const tempRooms = rooms.filter((x) =>
      x.name.toLowerCase().includes(searchKey.toLowerCase())
    )
    setFilterRooms(tempRooms)
  }
  function filterByType(type) {
    setType(type)
    if (type !== "all") {
      const tempRooms = rooms.filter(
        (x) => x.type.toLowerCase() == type.toLowerCase()
      )
      setFilterRooms(tempRooms)
    } else {
      setFilterRooms(rooms)
    }
  }

  function disabledDate(current) {
    return current && current < moment().startOf("day")
  }

  return (
    <>
      <div className='container mx-auto'>
        <div className='p-4 bg-white shadow-md rounded-md'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <DatePicker.RangePicker
                format='DD-MM-YYYY'
                onChange={filterByDate}
                disabledDate={disabledDate}
              />
            </div>
            <div>
              <input
                type='text'
                className='form-control w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500'
                placeholder='Search rooms'
                value={searchKey}
                onChange={(e) => {
                  setSearchKey(e.target.value.toLocaleLowerCase())
                }}
                onKeyUp={filterBySearch}
              />
            </div>
            <div>
              <select
                className='form-control w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500'
                value={type}
                onChange={(e) => {
                  filterByType(e.target.value)
                }}
              >
                <option value='all'>All</option>
                <option value='delux'>Delux</option>
                <option value='non-delux'>Non-Delux</option>
              </select>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-5'>
          {loading ? (
            <Loader />
          ) : (
            rooms &&
            rooms.length > 0 &&
            filterRooms?.map((x, id) => {
              return (
                <div className='col-span-3 md:col-span-1' key={id}>
                  <Rooms room={x} fromDate={fromDate} toDate={toDate} />
                </div>
              )
            })
          )}
        </div>
      </div>
    </>
  )
}

export default Homescreen
