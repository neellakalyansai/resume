import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReloadData, hideLoading, showLoading } from "../../Redux/rootSlice";
import axios from "axios";
import { message } from "antd";
import TextArea from "antd/es/input/TextArea";

function AdminProject() {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const { projects } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState("add");

  const onFinish = async (values) => {
    const tempTechnology = values.technologies.split(",");
    values.technologies = tempTechnology;
    try {
      dispatch(showLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post('/update_project', {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post('/add_project', values);
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
      const response = await axios.post('/delete_project', {
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
          Add Project
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 sm:grid-cols-1">
        {projects.map((project, index) => (
          <div className="shadow border p-5 border-gray-400 flex flex-col gap-2 rounded-lg">
            <h1 className="text-primary text-xl font-semibold">
              {project.title}
            </h1>
            <hr />
            <img src={project.image} alt="Project" className="h-60" />
            <h1>{project.description}</h1>
            <h1>
              <span className="font-semibold text-primary">
                Technology Stack :{" "}
              </span>
              {project.technologies.join(" , ")}
            </h1>
            <h1 className="text-blue-500 max-w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
              <span className="font-semibold text-primary">Link : </span>
              <a href={project.link}>{project.link}</a>
            </h1>
            <div className="flex justify-end gap-5 mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 border rounded"
                onClick={() => {
                  onDelete(project);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white py-2 px-4 border rounded"
                onClick={() => {
                  setSelectedItemForEdit(project);
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
          title={selectedItemForEdit ? "Edit Project" : "Add Project"}
          footer={null}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              ...selectedItemForEdit,
              technologies: selectedItemForEdit?.technologies.join(" , "),
            }}
          >
            <Form.Item name="title" label="Title">
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input placeholder="Image URL" />
            </Form.Item>
            <Form.Item name="link" label="Project Link">
              <Input placeholder="Project Link" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <TextArea placeholder="Description" />
            </Form.Item>
            <Form.Item name="technologies" label="Technology Stack">
              <TextArea placeholder="Technology Stack" />
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

export default AdminProject;
