import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Navbar from "./pages/Navbar"
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

function App() {
  const user = JSON.parse(localStorage.getItem("currentUser"))

  return (
    <div className='App'>
      <Navbar />
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
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/admin' element={<AdminScreen />} />
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
