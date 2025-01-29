import React, { useEffect, useRef, useState } from "react";
import Sectiontitle from "../../components/Sectiontitle";
import { useSelector } from "react-redux";

function Courses() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  
  const { portfolioData } = useSelector((state) => state.root);

  const {certificates } = portfolioData;

  const [isVisible, setIsVisible] = useState(false);
  const courseRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const courseTop = courseRef.current.getBoundingClientRect().top;

      if (courseTop < window.innerHeight * 0.75) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={courseRef} id="courseSection" className={`fade-in ${isVisible ? "visible" : ""}`}>
      <Sectiontitle title={"Certificates"} />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-4 border-[#2ca69862] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full sm:border-none">
          {certificates.map((project, index) => (
            <div
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer"
            >
              <h1
                className={`text-xl px-5 sm:py-3
                ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-1 rounded-sm bg-[#54d6bc3c] py-3 sm:border-b-2 sm:border-l-0 sm:-ml-0"
                    : "text-white"
                }`}
              >
                {project.title}
              </h1>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-10 sm:flex-col w-2/3 sm:w-full">
          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-xl">
              {certificates[selectedItemIndex].title}
            </h1>
            <p className="text-white">
              {certificates[selectedItemIndex].duration}
            </p>
            <p className="text-white">
              {certificates[selectedItemIndex].description}
            </p>
            <p className="text-tertiary">
            <a href={certificates[selectedItemIndex].link} target="_blank" rel="noreferrer">Click Here<i class="ri-arrow-right-up-line"></i></a>
            </p>
          </div>
          <img
            src={certificates[selectedItemIndex].image}
            className="h-52 w-80"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Courses;
