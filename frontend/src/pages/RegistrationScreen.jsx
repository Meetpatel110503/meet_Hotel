import React, { useState, useEffect } from "react"
import axios from "axios"
import Loader from "../components/Loading"
import Error from "../components/Error"
import Success from "../components/Success"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function RegisterScreen() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [cpassword, setCpassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  async function register(e) {
    e.preventDefault()
    if (password === cpassword) {
      const user = {
        name,
        email,
        phone,
        password,
        cpassword,
      }
      //console.log(user);
      setLoading(true)
      setError("")
      setSuccess("")
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/register",
          user
        )
        console.log(response.data)
        toast.success("Registartion successfull.")
        setSuccess(response)
        navigate("/")
        setName("")
        setEmail("")
        setPhone("")
        setPassword("")
        setCpassword("")
      } catch (error) {
        console.log(error)
        setError(error)
      }
      setLoading(false)
    } else {
      toast("Password not matched")
    }
  }

  return (
    <div>
      {loading && <Loader></Loader>}
      {error.length > 0 && <Error msg={error}></Error>}

      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
          {success.length > 0 && <Success msg={success}></Success>}
          <div className='bs'>
            <h2>Register</h2>
            <input
              type='text'
              className='form-control'
              placeholder='name'
              required
              autoComplete='off'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
            <input
              type='text'
              className='form-control'
              placeholder='email'
              required
              autoComplete='off'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <input
              type='text'
              className='form-control'
              placeholder='phone'
              required
              autoComplete='off'
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
              }}
            />
            <input
              type='text'
              className='form-control'
              placeholder='password'
              required
              autoComplete='off'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <input
              type='text'
              className='form-control'
              placeholder='confirm password'
              required
              autoComplete='off'
              value={cpassword}
              onChange={(e) => {
                setCpassword(e.target.value)
              }}
            />
            {loading ? (
              <div>Registering... Please Wait...</div>
            ) : (
              <button className='btn btn-primary mt-3' onClick={register}>
                Register
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen
