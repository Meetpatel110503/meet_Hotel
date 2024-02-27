import React, { useState, useEffect } from "react"
import axios from "axios"
import Rooms from "../components/Rooms"
import Loader from "../components/Loading"
import { DatePicker, Space } from "antd"
const { RangePicker } = DatePicker
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
      <div className='container'>
        <div className='row mt-5 bs'>
          <div className='col-md-3'>
            <RangePicker
              format='DD-MM-YYYY'
              onChange={filterByDate}
              disabledDate={disabledDate}
            />
          </div>

          <div className='col-md-5'>
            <input
              type='text'
              className='form-control'
              placeholder='search rooms'
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value.toLocaleLowerCase())
              }}
              onKeyUp={filterBySearch}
            />
          </div>
          <div className='col-md-3'>
            <select
              className='form-control'
              value={type}
              onChange={(e) => {
                filterByType(e.target.value)
              }}
            >
              <option value='all'>all</option>
              <option value='delux'>Delux</option>
              <option value='non-delux'>Non-Delux</option>
            </select>
          </div>
        </div>
        <div className='row justify-content-center mt-5'>
          {loading ? (
            <Loader></Loader>
          ) : (
            rooms &&
            rooms.length > 0 &&
            filterRooms?.map((x, id) => {
              return (
                <div className='col-md-9 mt-3' data-aos='flip-down' key={id}>
                  <Rooms room={x}  fromDate={fromDate} toDate={toDate} />
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
