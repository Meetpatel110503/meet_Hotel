import React from "react"
import { NavLink } from "react-router-dom"

function ErrorPage({ msg }) {
  return (
    <div>
      <div className='alert alert-danger error ' role='alert'>
        <h2 className='header'>404</h2>
        <h4>Sorry! Page not found</h4>
        <p>
          Oops! It seems like the page you're trying to access doesn't exist. If
          you believe there's an issue, feel free to report it, and we'll look
          into it.
        </p>
        <div className='btns'>
          <NavLink to='/home'>return home</NavLink>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
