import Loader from "../components/Loading"
import Error from "../components/Error"
import { useEffect, useState } from "react"

const BookingScreen = ({ match }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [room, setRooms] = useState({})
  const roomid = match.params.roomid
  console.log(roomid)
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setError("")
        setLoading(true)
        const response = await axios.get(
          "http://localhost:5000/api/rooms/getroombyid"
        )
        setRooms(response.data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
      setLoading(false)
    }
    fetchMyAPI()
    // eslint-disable-next-line
  }, [])
  console.log(room)

  return (
    <>
      <div className='m-5'>
        {loading ? (
          <Loader></Loader>
        ) : error.length > 0 ? (
          <Error msg={error}></Error>
        ) : (
          <div className='row justify-content-center mt-5 bs'>
            <div className='col-md-6'>
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} alt='' className='bigimg' />
            </div>
            <div className='col-md-6'>
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>
                    Name :{" "}
                    {JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p>From Date : {match.params.fromdate}</p>
                  <p>To Date : {match.params.todate}</p>
                  <p>Max Count : {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <h1>Amount</h1>
                <hr />
                <b>
                  <p>Total Days : {totalDays}</p>
                  <p>Rent per day : {room.rentperday}</p>
                  <p>Total Amount : {totalAmount}</p>
                </b>
              </div>

              <div style={{ float: "right" }}></div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export default BookingScreen
