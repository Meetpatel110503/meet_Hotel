import React, { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import Loader from "../../components/Loading"
import Error from "../../components/Error"
import Success from "../../components/Success"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function RegisterScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const onSubmit = async (data) => {
    const { name, email, phone, password, cpassword } = data
    if (password === cpassword) {
      setLoading(true)
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/register",
          data
        )
        toast.success("Registration successful.")
        navigate("/login")
      } catch (error) {
        setError("Invalid Credentials")
        toast.error("Registration failed. Please try again.")
      }
      setLoading(false)
    } else {
      toast.error("Passwords do not match.")
    }
  }

  return (
    <div>
      {error.length > 0 && <Error msg={error}></Error>}
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
          {success.length > 0 && <Success msg={success}></Success>}
          <form className='bs' onSubmit={handleSubmit(onSubmit)}>
            <h2>Register</h2>
            <input
              type='text'
              className='form-control'
              placeholder='Name'
              {...register("username", { required: true })}
            />
            {errors.name && <span>Name is required</span>}
            <input
              type='email'
              className='form-control'
              placeholder='Email'
              {...register("email", { required: true })}
            />
            {errors.email && <span>Email is required</span>}
            <input
              type='text'
              className='form-control'
              placeholder='Phone'
              {...register("phone", { required: true })}
            />
            {errors.phone && <span>Phone is required</span>}
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              {...register("password", { required: true })}
            />
            {errors.password && <span>Password is required</span>}
            <input
              type='cpassword'
              className='form-control'
              placeholder='Confirm Password'
              {...register("cpassword", { required: true })}
            />
            {errors.cpassword && <span>Confirm Password is required</span>}
            <button className='btn btn-primary mt-3' type='submit'>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen
