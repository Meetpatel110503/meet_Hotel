import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { login } from "../../redux/action/authSlice"
import Loader from "../../components/Loading"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function LoginScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    dispatch(login(data))
      .unwrap()
      .then(() => {
        navigate("/home")
        toast.success("login successfull.")
      })
      .catch(() => {
        toast.error("something went wrong,please try again.")
      })
  }

  return (
    <div>
      {loading && <Loader />}
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
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
