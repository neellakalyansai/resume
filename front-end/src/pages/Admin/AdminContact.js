import React from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/rootSlice";
import axios from "axios";
import { message } from "antd";

function AdminContact() {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/update_contact', {
        ...values,
        _id: portfolioData.contact._id,
      });
      dispatch(hideLoading());
      if (response.status === 200) {
        console.log(response.data);
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error(error.message);
    }
  };

  return (
    <div className="border border-gray-300 shadow-sm rounded pt-8 p-4">
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={portfolioData.contact}
      >
        <Form.Item name="name" label="Name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="age" label="Age">
          <Input placeholder="Age" />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Input placeholder="Gender" />
        </Form.Item>
        <Form.Item name="email" label="Email">
            <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
            <Input placeholder="Phone" />
        </Form.Item>
        <Form.Item name="country" label="Country">
            <Input placeholder="Country" />
        </Form.Item>

        <div className="flex justify-end w-full">
          <Button
            className="px-5 h-9 w-28 bg-primary text-white"
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AdminContact;
