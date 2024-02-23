import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("currentUser"))

  function Logout() {
    localStorage.removeItem("currentUser")
    navigate("/login")
  }
  return (
    <>
      <nav class='navbar navbar-expand-lg navbar-light bg-dark'>
        <Link class='navbar-brand' to='/home'>
          MEET HOTEL
        </Link>
        {user ? (
          <ul class='navbar-nav'>
            <li class='nav-item active'>
              <button class='nav-link' onClick={Logout}>
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul class='navbar-nav'>
            <li class='nav-item active'>
              <Link class='nav-link' to='/register'>
                Register
              </Link>
            </li>
            <li class='nav-item'>
              <Link class='nav-link' to='/login'>
                login
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </>
  )
}

export default Navbar
