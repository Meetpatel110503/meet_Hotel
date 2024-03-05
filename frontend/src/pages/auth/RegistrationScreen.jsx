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
    const { username, email, phone, password, cpassword } = data
    if (password === cpassword) {
      dispatch(register(data))
        .then(() => {
          toast.success("Registration successful.")
          navigate("/login")
        })
        .catch(() => {
          toast.error("Something went wrong, please try again.")
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
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-md'>
          <form
            className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8 space-y-6'
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
              Register
            </h2>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='username'
              >
                Username
              </label>
              <input
                type='text'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Name'
                {...registerForm("username", { required: true })}
              />
              {errors.username && (
                <p className='text-red-500'>Name is required</p>
              )}
            </div>

            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='email'
              >
                Email
              </label>
              <input
                type='email'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Email'
                {...registerForm("email", { required: true })}
              />
              {errors.email && (
                <p className='text-red-500'>Email is required</p>
              )}
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='phone'
              >
                Phone
              </label>
              <input
                type='text'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Phone'
                {...registerForm("phone", { required: true })}
              />
              {errors.phone && (
                <p className='text-red-500'>Phone is required</p>
              )}
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <input
                type='password'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Password'
                {...registerForm("password", { required: true })}
              />
              {errors.password && (
                <p className='text-red-500'>Password is required</p>
              )}
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='cpassword'
              >
                Confirm Password
              </label>
              <input
                type='password'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Confirm Password'
                {...registerForm("cpassword", { required: true })}
              />
              {errors.cpassword && (
                <p className='text-red-500'>Confirm Password is required</p>
              )}
            </div>
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type='submit'
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen
