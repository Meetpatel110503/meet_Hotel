import React from "react"
import { BrowserRouter, Route, Link } from "react-router-dom"
import AOS from "aos"
import "aos/dist/aos.css"
AOS.init({
  duration: 3000,
})

function LandingScreen() {
  return (
    <div className='justify-center items-center h-screen'>
      <div className='text-center'>
        <h2 data-aos='zoom-in' className='text-6xl mb-4 text-center'>
          <img
            src='https://imgfl.trivago.com/image/upload/v1708419090/hardcodedimages/homepage-landing/brand-elements/brand_tablet.svg'
            alt='image not found'
            style={{ height: "400px", width: "400px", marginInline: "auto" }}
          />
          HOTEL TAJ
        </h2>
        <h1 data-aos='zoom-out' className='text-4xl mb-4'>
          There is only one boss. The Guest.
        </h1>
        <p className='mb-4'>
          We compare hotel prices from 100s of sites. We’ll do the searching.
          You do the saving.
        </p>
        <Link to='/home'>
          <button className='btn btn-primary landingBtn'>Go to rooms</button>
        </Link>
      </div>
    </div>
  )
}

export default LandingScreen
