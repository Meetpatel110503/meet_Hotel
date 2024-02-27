import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Navbar from "./components/Navbar"
import Homescreen from "./pages/Homescreen"
import RegisterScreen from "./pages/RegistrationScreen"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import LoginScreen from "./pages/LoginScreen"
import BookingScreen from "./pages/BookingScreen"
import ErrorPage from "./pages/Error"
import Navbar1 from "./components/Navbar"
import ProfileScreen from "./pages/ProfileScreen"
import LandingScreen from "./pages/LandingScreen"
import AdminScreen from "./pages/AdminScreen"

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
