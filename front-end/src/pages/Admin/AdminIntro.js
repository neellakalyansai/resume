import React from "react";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/rootSlice";
import axios from "axios";
import { message } from "antd";

function AdminIntro() {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/update_intro', {
        ...values,
        _id: portfolioData.intro._id,
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
        initialValues={portfolioData.intro}
      >
        <Form.Item name="welcomeText" label="Welcome text">
          <Input placeholder="Welcome text" />
        </Form.Item>
        <Form.Item name="firstName" label="First name">
          <Input placeholder="First name" />
        </Form.Item>
        <Form.Item name="lastName" label="Last name">
          <Input placeholder="Last name" />
        </Form.Item>
        <Form.Item name="caption" label="Caption">
          <Input placeholder="Caption" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea placeholder="Description" />
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

export default AdminIntro;
