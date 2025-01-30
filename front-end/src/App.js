import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import React, { useEffect } from "react";
import Loader from "./components/Loader";
import AdminIndex from "./pages/Admin/AdminIndex";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  hideLoading,
  setPortfolioData,
  showLoading,
  ReloadData,
} from "./Redux/rootSlice";
import AdminLogin from "./pages/Admin/AdminLogin";

function App() {
  const dispatch = useDispatch();
  const { loading, portfolioData, reloadData } = useSelector(
    (state) => state.root
  );

  const getdata = async (req, res) => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/getdata");
      dispatch(setPortfolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(hideLoading());
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    if (!portfolioData) {
      getdata();
    }
  }, [portfolioData]); //eslint-disable-line

  useEffect(() => {
    if (reloadData) {
      getdata();
    }
  }, [reloadData]); //eslint-disable-line

  return (
    <BrowserRouter>
      {loading ? <Loader /> : null}
      {portfolioData && (
        <Routes>
          <Route path="/admin" element={<AdminIndex />} />
          <Route path="/admin_login" element={<AdminLogin />} />
          <Route path="/" element={<Home />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
