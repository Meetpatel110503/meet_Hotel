import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { register } from "../../redux/action/registerSlice"
import Loader from "../../components/Loading"
import Error from "../../components/Error"
import Success from "../../components/Success"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function RegisterScreen() {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.register)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const { name, email, phone, password, cpassword } = data
    if (password === cpassword) {
      dispatch(register(data)).then(() => {
        toast.success("registartion successfully.")
        navigate("/login")
      })
    } else {
      toast.error("Passwords do not match.")
    }
  }

  return (
    <div>
      {error && <Error msg={error} />}
      {success && <Success msg={success} />}
      {loading && <Loader />}
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
          <form className='bs' onSubmit={handleSubmit(onSubmit)}>
            <h2>Register</h2>
            <input
              type='text'
              className='form-control'
              placeholder='Name'
              {...registerForm("username", { required: true })}
            />
            {errors.name && <span>Name is required</span>}
            <input
              type='email'
              className='form-control'
              placeholder='Email'
              {...registerForm("email", { required: true })}
            />
            {errors.email && <span>Email is required</span>}
            <input
              type='text'
              className='form-control'
              placeholder='Phone'
              {...registerForm("phone", { required: true })}
            />
            {errors.phone && <span>Phone is required</span>}
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              {...registerForm("password", { required: true })}
            />
            {errors.password && <span>Password is required</span>}
            <input
              type='password'
              className='form-control'
              placeholder='Confirm Password'
              {...registerForm("cpassword", { required: true })}
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
