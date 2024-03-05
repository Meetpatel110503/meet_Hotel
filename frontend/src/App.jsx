import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./assets/styles/App.css"
import Navbar1 from "./pages/Navbar"
import Homescreen from "./pages/Homescreen"
import RegisterScreen from "./pages/auth/RegistrationScreen"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import LoginScreen from "./pages/auth/LoginScreen"
import BookingScreen from "./pages/BookingScreen"
import ErrorPage from "./pages/Error"
import ProfileScreen from "./pages/ProfileScreen"
import LandingScreen from "./pages/LandingScreen"
import AdminScreen from "./pages/admin/AdminScreen"
import AdminUserScreen from "./pages/admin/AdminUserScreen"
import AdminAddRoomScreen from "./pages/admin/AdminAddRoomScreen"
import AdminBookingScreen from "./pages/admin/AdminBookingScreen"
import AdminRoomScreen from "./pages/admin/AdminRoomScreen"

function App() {
  return (
    <div className='App'>
      <Navbar1 />
      <Routes>
        <Route path='/' element={<LandingScreen />} />
        <Route path='/home' element={<Homescreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route
          path='/book/:roomid/:fromdate/:todate'
          element={<BookingScreen />}
        />
        <Route path='*' element={<ErrorPage />} />
        <Route path='/food' element={<ErrorPage />} />
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/admin' element={<AdminScreen />}>
          <Route path='users' element={<AdminUserScreen />} />
          <Route path='addroom' element={<AdminAddRoomScreen />} />
          <Route path='bookings' element={<AdminBookingScreen />} />
          <Route path='rooms' element={<AdminRoomScreen />} />
        </Route>
      </Routes>
      <ToastContainer
        position='top-center'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </div>
  )
}

export default App
