import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReloadData, hideLoading, showLoading } from "../../Redux/rootSlice";
import axios from "axios";
import { message } from "antd";
import TextArea from "antd/es/input/TextArea";

function AdminExperience() {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const { experiences } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState("add");

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post('/update_experience', {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post('/add_experience', values);
      }
      dispatch(hideLoading());
      if (response.status === 200) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error(error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/delete_experience', {
        _id: item._id,
      });
      dispatch(hideLoading());
      if (response.status === 200) {
        message.success(response.data.message);
        dispatch(ReloadData(true));
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
    <div className="border border-gray-300 shadow-sm rounded pt-4 p-4">
      <div className="flex justify-end">
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg mb-4"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
            setType("add");
          }}
        >
          Add Experience
        </button>
      </div>
      <div className="grid grid-cols-4 gap-5 sm:grid-cols-1">
        {experiences.map((experience, index) => (
          <div className="shadow border p-5 border-gray-400 rounded-lg flex flex-col gap-2">
            <h1 className="text-primary text-xl font-semibold">
              {experience.degree}
            </h1>
            <hr />
            <h1>Company : {experience.company}</h1>
            <h1>Duration : {experience.period}</h1>
            <h1>{experience.description}</h1>
            <div className="flex justify-end gap-5 mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 border rounded"
                onClick={() => {
                  onDelete(experience);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white py-2 px-4 border rounded"
                onClick={() => {
                  setSelectedItemForEdit(experience);
                  setShowAddEditModal(true);
                  setType("edit");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      {(type === "add" || selectedItemForEdit) && (
        <Modal
          open={showAddEditModal}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
          }}
          title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
          footer={null}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={selectedItemForEdit}
          >
            <Form.Item name="post" label="Post">
              <Input placeholder="Post" />
            </Form.Item>
            <Form.Item name="company" label="Company">
              <Input placeholder="Company" />
            </Form.Item>
            <Form.Item name="period" label="Period">
              <Input placeholder="Period" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <TextArea placeholder="Description" />
            </Form.Item>
            <div className="flex justify-end">
              <button
                className="bg-white border-primary text-primary py-2 px-4 rounded"
                onClick={() => {
                  setShowAddEditModal(false);
                  setSelectedItemForEdit(null);
                }}
              >
                Cancel
              </button>
              <button className="bg-primary text-white py-2 px-4 rounded">
                {selectedItemForEdit ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default AdminExperience;
