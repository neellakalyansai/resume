import React, { useEffect, useRef, useState } from "react";
import Sectiontitle from "../../components/Sectiontitle";
import { useSelector } from "react-redux";

function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const { portfolioData } = useSelector((state) => state.root);

  const {projects} = portfolioData;

  const [isVisible, setIsVisible] = useState(false);
  const projectRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const projectTop = projectRef.current.getBoundingClientRect().top;

      if (projectTop < window.innerHeight * 0.75) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={projectRef} id="projectSection" className={`fade-in ${isVisible ? "visible" : ""}`}>
      <Sectiontitle title={"Projects"} />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-4 border-[#2ca69862] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full sm:border-none">
          {projects.map((project, index) => (
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
            <img src={projects[selectedItemIndex].image} className="h-60 w-72" alt=""/>
          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-xl">
              {projects[selectedItemIndex].title}
            </h1>
            <p className="text-white">
              {projects[selectedItemIndex].description || ''}
            </p>
            <p className="text-white">
             {projects[selectedItemIndex].technologies+"," || ''} 
            </p>
            <p className="text-tertiary">
            <a href={projects[selectedItemIndex].link}>Click Here<i class="ri-arrow-right-up-line"></i></a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
