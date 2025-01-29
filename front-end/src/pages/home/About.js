import React, { useEffect, useRef, useState } from "react";
import Sectiontitle from "../../components/Sectiontitle";
import lottie from "lottie-web";
import { useSelector } from "react-redux";

function About() {
  const { portfolioData } = useSelector((state) => state.root);

  const { skills, lottieURL, description1, description2 } = portfolioData.about;

  const lottieRef = React.useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const aboutRef = useRef(null);
  const skillRef = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: lottieURL || "",
    });

    return () => animation.destroy();
  }, [lottieURL]);

  useEffect(() => {
    const handleScroll = () => {
      const aboutTop = aboutRef.current.getBoundingClientRect().top;

      if (aboutTop < window.innerHeight * 0.75) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSkills = skillRef.current.getBoundingClientRect().top;

      if (aboutSkills < window.innerHeight * 0.999) {
        setIsVisible2(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div ref={aboutRef} id="aboutSection" className={`fade-in ${isVisible ? "visible" : ""}`}>
      <Sectiontitle title="About" />
      <div className="-mt-10 sm:-mt-16 flex w-full items-center justify-center sm:flex-col">
        <div
          className="h-[70vh] w-1/2 sm:w-full sm:h-[50vh] sm:-mb-8"
          ref={lottieRef}
        ></div>
        <div className="flex flex-col gap-5 w-1/2 sm:w-full">
          <p className="text-white">{description1 || ""}</p>
          <p className="text-white">{description2 || ""}</p>
        </div>
      </div>

      <div className="py-5">
        <h1 className="text-tertiary text-xl">
          Here are a few technologies I've been working with recently:
        </h1>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-10 mt-5">
            {skills.map((skill) => (
              <div ref={skillRef} className={`border border-tertiary py-3 px-10 fade-in ${isVisible2 ? "visible" : ""}`}>
                <h1 className="text-tertiary ">{skill}</h1>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default About;
