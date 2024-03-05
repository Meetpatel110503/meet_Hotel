import React from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

function AdminAddRoomScreen() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (values) => {
    try {
      const data = await axios.post(
        "http://localhost:5000/api/rooms/addroom",
        values
      )
      toast.success("room added successfully")
      reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='row'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-2xl font-bold mb-4'>Add Room</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-md mx-auto'>
          <div className='mb-4'>
            <label htmlFor='name' className='block text-sm font-medium mb-2'>
              Name
            </label>
            <input
              type='text'
              id='name'
              className='form-input w-full'
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className='text-red-500'>Name is required</span>
            )}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='description'
              className='block text-sm font-medium mb-2'
            >
              Description
            </label>
            <input
              type='text'
              id='description'
              className='form-input w-full'
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className='text-red-500'>Description is required</span>
            )}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='maxpeople'
              className='block text-sm font-medium mb-2'
            >
              Max People
            </label>
            <input
              type='text'
              id='maxpeople'
              className='form-input w-full'
              {...register("maxpeople", { required: true })}
            />
            {errors.maxpeople && (
              <span className='text-red-500'>maxpeople is required</span>
            )}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='phonenumber'
              className='block text-sm font-medium mb-2'
            >
              phonenumber
            </label>
            <input
              type='text'
              id='phonenumber'
              className='form-input w-full'
              {...register("phonenumber", { required: true })}
            />
            {errors.phonenumber && (
              <span className='text-red-500'>phonenumber is required</span>
            )}
          </div>
          <div className='mb-4'>
            <label htmlFor='price' className='block text-sm font-medium mb-2'>
              price
            </label>
            <input
              type='text'
              id='price'
              className='form-input w-full'
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className='text-red-500'>price is required</span>
            )}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='roomNumber'
              className='block text-sm font-medium mb-2'
            >
              roomNumber
            </label>
            <input
              type='text'
              id='roomNumber'
              className='form-input w-full'
              {...register("roomNumber", { required: true })}
            />
            {errors.roomNumber && (
              <span className='text-red-500'>roomNumber is required</span>
            )}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='imageurl1'
              className='block text-sm font-medium mb-2'
            >
              imageurl1
            </label>
            <input
              type='text'
              id='imageurl1'
              className='form-input w-full'
              {...register("imageurl1", { required: true })}
            />
            {errors.imageurl1 && (
              <span className='text-red-500'>imageurl1 is required</span>
            )}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='imageurl2'
              className='block text-sm font-medium mb-2'
            >
              imageurl2
            </label>
            <input
              type='text'
              id='imageurl1'
              className='form-input w-full'
              {...register("imageurl2")}
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='imageurl3'
              className='block text-sm font-medium mb-2'
            >
              imageurl3
            </label>
            <input
              type='text'
              id='imageurl3'
              className='form-input w-full'
              {...register("imageurl3")}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='type' className='block text-sm font-medium mb-2'>
              Type
            </label>
            <select
              id='type'
              className='form-select w-full'
              {...register("type", { required: true })}
            >
              <option value=''></option>
              <option value='Non-Delux'>Non-Delux</option>
              <option value='Delux'>Delux</option>
            </select>
            {errors.type && (
              <span className='text-red-500'>Type is required</span>
            )}
          </div>

          <div className='flex justify-between'>
            <button
              type='submit'
              className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
            >
              Add
            </button>
            <button
              type='button'
              onClick={reset}
              className='bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400'
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminAddRoomScreen
