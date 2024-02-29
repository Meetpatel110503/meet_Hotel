import React, { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import Loader from "../../components/Loading"
import Error from "../../components/Error"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function LoginScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        data
      )
      localStorage.setItem("currentUser", JSON.stringify(response))
      navigate("/home")
    } catch (error) {
      setError("Invalid Credentials")
      toast.error("something went wrong,please try again.")
    }
    setLoading(false)
  }

  return (
    <div>
      {loading && <Loader />}

      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
          {error.length > 0 && <Error msg={error} />}
          <div className='bs'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type='email'
                className='form-control'
                placeholder='Email'
                {...register("email", { required: true })}
              />
              {errors.email && <span>Email is required</span>}
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                {...register("password", { required: true })}
              />
              {errors.password && <span>Password is required</span>}
              <br />
              {loading ? (
                <div>Login...Please Wait...</div>
              ) : (
                <button className='btn btn-primary mt-3' type='submit'>
                  Login
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
