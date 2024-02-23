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

function App() {
  return (
    <div className='App'>
      <Navbar1 />
      <Routes>
        <Route path='/' element={<Homescreen />} />
        <Route path='/home' element={<Homescreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route
          path='/book/:roomid/:fromdate/:todate'
          element={<BookingScreen />}
        />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
