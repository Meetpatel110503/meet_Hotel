import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { login } from "../../redux/action/authSlice"
import Loader from "../../components/Loading"
import { Link, useNavigate } from "react-router-dom"
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
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-md'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          >
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
              Login
            </h2>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='email'
              >
                Email
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='email'
                type='email'
                placeholder='Email'
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className='text-red-500 text-xs italic'>Email is required</p>
              )}
            </div>
            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb2'
                id='password'
                type='password'
                placeholder='Password'
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className='text-red-500 text-xs italic'>
                  Password is required
                </p>
              )}
            </div>
            <div>
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type='submit'
                disabled={loading}
              >
                {loading ? "Login...Please Wait..." : "Login"}
              </button>
              <br />
            </div>
            <div className='text-sm font-medium text-gray-900 dark:text-white pt-3'>
              Not registered yet?
              <Link
                className='text-blue-600 hover:underline dark:text-blue-500'
                to='/register'
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
