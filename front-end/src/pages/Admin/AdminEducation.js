import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReloadData, hideLoading, showLoading } from "../../Redux/rootSlice";
import axios from "axios";
import { message } from "antd";
import TextArea from "antd/es/input/TextArea";

function AdminEducation() {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const { educations } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState("add");

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post('/update_education', {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post('/add_education', values);
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
      const response = await axios.post('/delete_education', {
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
          Add Education
        </button>
      </div>
      <div className="grid grid-cols-4 gap-5 sm:grid-cols-1">
        {educations.map((education, index) => (
          <div className="shadow border p-5 border-gray-400 rounded-lg flex flex-col gap-2">
            <h1 className="text-primary text-xl font-semibold">
              {education.degree}
            </h1>
            <hr />
            <h1>School : {education.school}</h1>
            <h1>Duration : {education.period}</h1>
            <h1>Marks : {education.marks}</h1>
            <h1>{education.description}</h1>
            <div className="flex justify-end gap-5 mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 border rounded"
                onClick={() => {
                  onDelete(education);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white py-2 px-4 border rounded"
                onClick={() => {
                  setSelectedItemForEdit(education);
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
          title={selectedItemForEdit ? "Edit Education" : "Add Education"}
          footer={null}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={selectedItemForEdit}
          >
            <Form.Item name="degree" label="Degree">
              <Input placeholder="Degree" />
            </Form.Item>
            <Form.Item name="school" label="School">
              <Input placeholder="School" />
            </Form.Item>
            <Form.Item name="period" label="Period">
              <Input placeholder="Period" />
            </Form.Item>
            <Form.Item name="marks" label="Marks">
              <Input placeholder="Marks" />
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

export default AdminEducation;
