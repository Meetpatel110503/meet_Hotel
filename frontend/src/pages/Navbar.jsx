import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"

function Navbar1() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("currentUser"))

  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 pt-2'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto '>
        <Link
          to='/'
          className='flex items-center space-x-3 rtl:space-x-reverse text-decoration-none'
        >
          <img
            src='https://logo.com/image-cdn/images/kts928pd/production/b00e2d30865932fc1c1d86658c7208810fe7911a-731x731.png?w=1080&q=72'
            className='h-8 rounded'
            alt='Flowbite Logo'
          />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white font-sans font-family: Monaco'>
            HOTEL-TAJ
          </span>
        </Link>
        <button
          data-collapse-toggle='navbar-multi-level'
          type='button'
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='navbar-multi-level'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        <div
          className='hidden w-full md:block md:w-auto'
          id='navbar-multi-level'
        >
          {user ? (
            <ul className='flex flex-col font-medium  md:p-0 mt-2  border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li>
                <Link
                  to='/home'
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-decoration-none'
                  aria-current='page'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/profile'
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-decoration-none'
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to='/login'
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-decoration-none'
                  onClick={() => localStorage.removeItem("currentUser")}
                >
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className='flex flex-col font-medium p-4 md:p-0 mt-4  border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li>
                <Link
                  to='/home'
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-decoration-none'
                  aria-current='page'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/login'
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-decoration-none'
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to='/register'
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-decoration-none'
                >
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar1
