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
  const [error, setError] = useState("")
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()
  const [duplicateRooms, setDuplicateRooms] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [type, setType] = useState("all")

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setError("")
        setLoading(true)
        const response = await axios.get(
          "http://localhost:5000/api/rooms/getallrooms"
        )
        setRooms(response.data)
        //console.log(response.data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
      setLoading(false)
    }
    fetchMyAPI()
    // eslint-disable-next-line
  }, [])
  console.log(rooms)

  function filterByDate(dates) {
    console.log(dates)
    console.log(moment(dates[0].$d).format("DD-MM-YYYY"))
    console.log(moment(dates[1].$d).format("DD-MM-YYYY"))

    try {
      setFromDate(moment(dates[0].$d).format("DD-MM-YYYY"))
      setToDate(moment(dates[1].$d).format("DD-MM-YYYY"))

      // var tempRooms = []
      // for (const room of duplicateRooms) {
      //   var availability = false
      //   if (room.currentbookings.length > 0) {
      //     for (const booking of room.currentbookings) {
      //       if (
      //         !moment(moment(dates[0].$d).format("DD-MM-YYYY")).isBetween(
      //           booking.fromdate,
      //           booking.todate
      //         ) &&
      //         !moment(moment(dates[1].$d).format("DD-MM-YYYY")).isBetween(
      //           booking.fromdate,
      //           booking.todate
      //         )
      //       ) {
      //         if (
      //           moment(dates[0].$d).format("DD-MM-YYYY") !== booking.fromdate &&
      //           moment(dates[0].$d).format("DD-MM-YYYY") !== booking.todate &&
      //           moment(dates[1]).$d.format("DD-MM-YYYY") !== booking.fromdate &&
      //           moment(dates[1]).$d.format("DD-MM-YYYY") !== booking.todate
      //         ) {
      //           availability = true
      //         }
      //       }
      //     }
      //   }
      //   if (availability == true || room.currentbookings.length == 0) {
      //     tempRooms.push(room)
      //   }
      // }
      // setRooms(tempRooms)
    } catch (error) {}
  }
  return (
    <>
      {/* <h1>rooms {rooms && rooms.length > 0 && <>{rooms.length}</>}</h1> */}
      <div className='container'>
        <div className='row mt-5 bs'>
          <div className='col-md-3'>
            <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
          </div>

          {/* <div className='col-md-5'>
            <input
              type='text'
              className='form-control'
              placeholder='search rooms'
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value)
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
              <option value='all'>All</option>
              <option value='delux'>Delux</option>
              <option value='non-delux'>Non-Delux</option>
            </select>
          </div> */}
        </div>
        <div className='row justify-content-center mt-5'>
          {loading ? (
            <Loader></Loader>
          ) : error.length > 0 ? (
            <Error msg={error}></Error>
          ) : (
            rooms &&
            rooms.length > 0 &&
            rooms?.map((x, i) => {
              return (
                <div className='col-md-9 mt-3' data-aos='flip-down'>
                  <Rooms room={x} key={i} fromDate={fromDate} toDate={toDate} />
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
