import { Form, Input, Modal ,message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReloadData, hideLoading, showLoading } from "../../Redux/rootSlice";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";

function AdminCertificates() {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const { certificates } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState("add");

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post('/update_certificate', {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post('/add_certificate', values);
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
      const response = await axios.post('/delete_certificate', {
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
          Add Certificate
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 sm:grid-cols-1">
        {certificates.map((certificate, index) => (
          <div className="shadow border p-5 border-gray-400 flex flex-col gap-2 rounded-lg">
            <h1 className="text-primary text-xl font-semibold">
              {certificate.title}
            </h1>
            <hr />
            <img src={certificate.image} alt="Certificate" className="h-60" />
            <h1>{certificate.description}</h1>
            <h1 className="text-blue-500 max-w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
              <span className="font-semibold text-primary">Link : </span>
              <a href={certificate.link}>{certificate.link}</a>
            </h1>
            <div className="flex justify-end gap-5 mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 border rounded"
                onClick={() => {
                  onDelete(certificate);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white py-2 px-4 border rounded"
                onClick={() => {
                  setSelectedItemForEdit(certificate);
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
          title={selectedItemForEdit ? "Edit Certificate" : "Add Certificate"}
          footer={null}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={selectedItemForEdit}
          >
            <Form.Item name="title" label="Title">
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item name="issuedBy" label="Issued By">
              <Input placeholder="Issued By" />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input placeholder="Image URL" />
            </Form.Item>
            <Form.Item name="duration" label="Duration">
              <Input placeholder="Duration" />
            </Form.Item>
            <Form.Item name="link" label="Certificate Link">
              <Input placeholder="Certificate Link" />
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

export default AdminCertificates;
