import React from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  function Logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }
  
  const navAction = () => {
    if (user) {
      return (
        <ul className="navbar-nav mr-5">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-user mr-2"></i>
              {user.name}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="/profile">
                Profile
              </a>

              <a className="dropdown-item" href="#" onClick={Logout}>
                Logout
              </a>
            </div>
          </div>
        </ul>
      );
    }

    return (
      <div class='collapse navbar-collapse' id='navbarNav'>
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
    </div>
    );
  };

  return (
    <>
      <nav class='navbar navbar-expand-lg navbar-light bg-dark'>
        <Link class='navbar-brand' to='/home'>
          MEET HOTEL
        </Link>
        <button
          class='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span class='navbar-toggler-icon'></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {navAction()}
        </div>
      </nav>
    </>
  )
}

export default Navbar
