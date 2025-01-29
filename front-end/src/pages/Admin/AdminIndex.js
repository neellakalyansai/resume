import React, { useEffect } from "react";
import Header from "../../components/Header";
import AdminIntro from "./AdminIntro";
import Adminabout from "./Adminabout";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import AdminEducation from "./AdminEducation";
import AdminProject from "./AdminProject";
import AdminCertificates from "./AdminCertificates";
import AdminContact from "./AdminContact";
import AdminExperience from "./AdminExperience";
const { TabPane } = Tabs;

function AdminIndex() {
  const { portfolioData } = useSelector((state) => state.root);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return (window.location.href = "/admin_login");
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl p-5 -mb-5 text-primary font-semibold">
          Portfolio Admin
        </h1>
        <button className="text-white bg-primary px-2.5 py-1.5 rounded mr-5" onClick={()=>{
          localStorage.removeItem("token");
          window.location.href = "/admin_login";
        }}>
          Logout
        </button>
      </div>
      {portfolioData && (
        <div className="p-5 border border-gray-300 shadow-sm rounded m-4 pt-2">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Intro" key="1">
              <AdminIntro />
            </TabPane>
            <TabPane tab="About" key="2">
              <Adminabout />
            </TabPane>
            <TabPane tab="Education" key="3">
              <AdminEducation />
            </TabPane>
            <TabPane tab="Experience" key="4">
              <AdminExperience />
            </TabPane>
            <TabPane tab="Project" key="5">
              <AdminProject />
            </TabPane>
            <TabPane tab="Certificates" key="6">
              <AdminCertificates />
            </TabPane>
            <TabPane tab="Contact" key="7">
              <AdminContact />
            </TabPane>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default AdminIndex;
