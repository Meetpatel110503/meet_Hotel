import React, { useState, useEffect } from "react"
import axios from "axios"
import { Form, Input, InputNumber, Button, Select } from "antd"

import Loader from "../components/Loading"
import Error from "../components/Error"
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

  const [room, setRoom] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [form] = Form.useForm()

  const onFinish = async (values) => {
   
    setError("")
    setLoading(true)
    try {
      const data = (
        await axios.post("http://localhost:5000/api/rooms/addroom", values)
      ).data
      form.resetFields()
    } catch (error) {
  
      setError(error)
    }

    setLoading(false)
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
    <div className='row'>
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className='col-md-12'>
          <Form
            {...layout}
            form={form}
            name='control-hooks'
            onFinish={onFinish}
          >
            <Form.Item
              name='name'
              label='Name'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='description'
              label='Description'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='maxcount'
              label='Maxcount'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber min={1} defaultChecked={1} />
            </Form.Item>
            <Form.Item
              name='phonenumber'
              label='Phonenumber'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='rentperday'
              label='Rentperday'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber min={1} defaultChecked={1} />
            </Form.Item>
            <Form.Item
              name='imageurl1'
              label='Imageurl1'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='imageurl2'
              label='Imageurl2'
              rules={[
                {
                  //required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='imageurl3'
              label='Imageurl3'
              rules={[
                {
                  //required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='type'
              label='Type'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder='Select a room type' allowClear>
                <Option value='delux'>Delux</Option>
                <Option value='non-delux'>Non-Delux</Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type='success' htmlType='submit'>
                Add
              </Button>
              <Button type='danger' htmlType='button' onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  )
}

export default AdminAddRoomScreen
