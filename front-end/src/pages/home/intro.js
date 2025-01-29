import React from "react";
import { useSelector } from "react-redux";

function Intro() {

  const { portfolioData } = useSelector((state) => state.root);

  const {firstName, lastName , welcomeText , description , caption } = portfolioData.intro;

  const scrollToSection = () => {
    const sectionId = "aboutSection";
    const sectionElement = document.getElementById(sectionId);
  
    if (sectionElement) {
      window.scrollTo({
        top: sectionElement.offsetTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="h-[80vh] bg-primary flex flex-col items-start justify-center gap-10 py-10 sm:h-[60vh]">
      <h1 className="text-white font-semibold text-2xl sm:-mt-5 sm:-mb-3">
        {welcomeText||''}
      </h1>
      <h1 className="text-secondary text-7xl sm:text-3xl font-semibold sm:-mb-3">
        {firstName||''} {lastName||''}
      </h1>
      <h1 className="text-white text-7xl  sm:text-3xl font-semibold sm:-mb-3">
        {caption||''}
      </h1>
      <p className="text-tertiary w-1/2 sm:w-4/5 font-medium ">
        {description||''}
      </p>
      <button className="border-2 border-tertiary text-tertiary px-5 py-3 rounded hover:bg-tertiary hover:text-white" onClick={scrollToSection}>
        Get started
      </button>
    </div>
  );
}

export default Intro;
