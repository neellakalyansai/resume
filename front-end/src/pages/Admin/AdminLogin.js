import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { hideLoading, showLoading } from "../../Redux/rootSlice";
import { useDispatch } from "react-redux";

function AdminLogin() {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const dispatch = useDispatch();

  const login = async (ev) => {
    ev.preventDefault();
    debugger;
    try {
      dispatch(showLoading());
      const response = await axios.post("/login", user);
      dispatch(hideLoading());
      if (response.status === 200) {
        message.success(response.data.message);
        localStorage.setItem("token", JSON.stringify(response.data));
        window.location.href = "/admin";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="w-96 flex gap-5 p-5 shadow border border-gray-500 flex-col bg-white">
        <h1 className="text-2xl">Portfolio - Admin Login</h1>
        <hr />
        <form
          className="flex gap-5 border-gray-500 flex-col"
          onSubmit={(ev) => {
            login(ev);
          }}
        >
          <input
            type="text"
            value={user.userName}
            onChange={(e) => {
              setUser({ ...user, userName: e.target.value });
            }}
            placeholder="Username"
          />
          <input
            type="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            placeholder="Password"
          />
          <button className="bg-primary text-white p-2" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
