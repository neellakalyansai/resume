import React, { useEffect, useRef, useState } from "react";
import Sectiontitle from "../../components/Sectiontitle";
import { useSelector } from "react-redux";

function Experience() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const { portfolioData } = useSelector((state) => state.root);

  const {experiences} = portfolioData;

  const [isVisible, setIsVisible] = useState(false);
  const educationRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const educationTop = educationRef.current.getBoundingClientRect().top;

      if (educationTop < window.innerHeight * 0.75) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={educationRef} id="educationSection" className={`fade-in ${isVisible ? "visible" : ""}`}>
      <Sectiontitle title={"Experience"} />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-4 border-[#2ca69862] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full sm:border-none">
          {experiences.map((experience, index) => (
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
                {experience.company}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5 w-2/3 sm:w-full">
            <h1 className="text-secondary text-xl">{experiences[selectedItemIndex].post}</h1>
            <h1 className="text-tertiary text-xl">{experiences[selectedItemIndex].period}</h1>
            <p className="text-white">
            {experiences[selectedItemIndex].description.split('•').map((bullet, index) => (
              index !== 0 &&
              <span key={index}>
                {index !== 0 && <span>&#8226;</span>}
                {bullet.trim()} 
                <br /> 
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Experience;
