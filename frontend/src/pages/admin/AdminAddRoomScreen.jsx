import React from "react"
import axios from "axios"
import { Form, Input, InputNumber, Button, Select } from "antd"
import { useForm } from "react-hook-form"

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
}

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

function AdminAddRoomScreen() {
  const { Option } = Select
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (values) => {
    try {
      console.log(values)
      const data = await axios.post(
        "http://localhost:5000/api/rooms/addroom",
        values
      )
      reset() // Reset the form after successful submission
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='row'>
      <div className='col-md-12'>
        <Form {...layout} onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true, message: "Name is required" }]}
          >
            <input {...register("name")} />
          </Form.Item>
          <Form.Item
            label='Description'
            name='description'
            rules={[{ required: true, message: "Description is required" }]}
          >
            <input {...register("description")} />
          </Form.Item>
          <Form.Item
            label='Maxpeople'
            name='maxpeople'
            rules={[{ required: true, message: "Maxcount is required" }]}
          >
            <input {...register("maxpeople")} />
          </Form.Item>
          <Form.Item
            label='Phonenumber'
            name='phonenumber'
            rules={[{ required: true, message: "Phonenumber is required" }]}
          >
            <input {...register("phonenumber")} />
          </Form.Item>
          <Form.Item
            label='Rentperday'
            name='price'
            rules={[{ required: true, message: "Rentperday is required" }]}
          >
            <input {...register("price")} min={1} />
          </Form.Item>
          <Form.Item
            label='Room Number'
            name='roomNumber'
            rules={[{ required: true, message: "Room number is required" }]}
          >
            <input {...register("roomNumber")} />
          </Form.Item>
          <Form.Item
            label='Imageurl1'
            name='imageurl1'
            rules={[{ required: true, message: "Imageurl1 is required" }]}
          >
            <input {...register("imageurl1")} />
          </Form.Item>
          <Form.Item label='Imageurl2' name='imageurl2'>
            <input {...register("imageurl2")} />
          </Form.Item>
          <Form.Item label='Imageurl3' name='imageurl3'>
            <input {...register("imageurl3")} />
          </Form.Item>
          <Form.Item
            label='Type'
            name='type'
            rules={[{ required: true, message: "Type is required" }]}
          >
            <select placeholder='Select a room type' {...register("type")}>
              <option value='Delux'>Delux</option>
              <option value='Non-Delux'>Non-Delux</option>
            </select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Add
            </Button>
            <Button htmlType='button' onClick={reset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default AdminAddRoomScreen
