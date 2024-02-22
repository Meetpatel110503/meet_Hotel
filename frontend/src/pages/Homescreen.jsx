import React, { useState, useEffect } from "react"
import axios from "axios"
import Rooms from "../components/Rooms"
import Loader from "../components/Loading"

function Homescreen() {
  const [loading, setLoading] = useState(true)
  const [rooms, setRooms] = useState([])
  const [error, setError] = useState("")

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
  return (
    <>
      {/* <h1>rooms {rooms && rooms.length > 0 && <>{rooms.length}</>}</h1> */}
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
                <Rooms room={x} key={i} />
              </div>
            )
          })
        )}
      </div>
    </>
  )
}

export default Homescreen
