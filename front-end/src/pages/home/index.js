import React from "react";
import Header from "../../components/Header"; // eslint-disable-line
import Intro from "../../pages/home/intro";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education"
import Projects from "./Projects";
import Courses from "./Courses";
import Contact from "./Contact";
import Footer from "../../components/Footer";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import ScrollTrigger from "react-scroll-trigger";

function Home() {
  const { portfolioData } = useSelector((state) => state.root);
  return (
    <div>
      <Header />
      {portfolioData && (
        <div className="bg-primary px-40 sm:px-5">
          <Intro />
          <ScrollTrigger
            onEnter={() => {
              console.log("About component entered the viewport");
              // You can add additional logic or set state for animations
            }}
          >
            <About />
          </ScrollTrigger>
          <ScrollTrigger
            onEnter={() => {
              console.log("Education component entered the viewport");
              // You can add additional logic or set state for animations
            }}
          >
            <Education />
          </ScrollTrigger>
          <ScrollTrigger
            onEnter={() => {
              console.log("Projects component entered the viewport");
              // You can add additional logic or set state for animations
            }}
          >
            <Projects />
          </ScrollTrigger>
          <ScrollTrigger
            onEnter={() => {
              console.log("Experience component entered the viewport");
              // You can add additional logic or set state for animations
            }}
          >
            <Experience />
          </ScrollTrigger>
          <ScrollTrigger
            onEnter={() => {
              console.log("Courses component entered the viewport");
              // You can add additional logic or set state for animations
            }}
          >
            <Courses />
          </ScrollTrigger>
          <ScrollTrigger
            onEnter={() => {
              console.log("Contact component entered the viewport");
              // You can add additional logic or set state for animations
            }}
          >
            <Contact />
          </ScrollTrigger>
          <Footer />
          <SideBar />
        </div>
      )}
    </div>
  );
}

export default Home;
