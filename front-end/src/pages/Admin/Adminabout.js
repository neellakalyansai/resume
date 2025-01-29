import React from "react";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import {
  hideLoading,
  showLoading,
} from "../../Redux/rootSlice";
import axios from "axios";
import { message } from "antd";

function AdminAbout() {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const tempSkills = values.skills.split(',');
      values.skills = tempSkills
      dispatch(showLoading());
      const response = await axios.post('/update_about', {
        ...values,
        _id: portfolioData.about._id,
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
        initialValues={{
          ...portfolioData.about,
          skills: portfolioData.about.skills.join(" , "),
        }}
      >
        <Form.Item name="lottieURL" label="Lottie URL">
          <Input placeholder="Lottie URL" />
        </Form.Item>
        <Form.Item name="description1" label="Description 1">
          <TextArea placeholder="Description 1" />
        </Form.Item>
        <Form.Item name="description2" label="Description 2">
          <TextArea placeholder="Description 2" />
        </Form.Item>
        <Form.Item name="skills" label="Skills">
          <TextArea placeholder="Skills" />
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

export default AdminAbout;
