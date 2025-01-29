import React, { useEffect, useRef, useState } from "react";
import Sectiontitle from "../../components/Sectiontitle";
import lottie from "lottie-web"; // Import the Lottie Player library
import { useSelector } from "react-redux";

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);

  const { contact } = portfolioData;
  const lottieRef = React.useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const contactTop = contactRef.current.getBoundingClientRect().top;

      if (contactTop < window.innerHeight * 0.75) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://lottie.host/a7fdaf42-64a7-4195-a375-3723038d143e/BtF5QQqjaN.json",
    });

    return () => animation.destroy();
  }, []);

  return (
    <div ref={contactRef} id="contactSection" className={`fade-in ${isVisible ? "visible" : ""}`}>
      <Sectiontitle title={"Say Hello !"} />
      <div className="flex sm:flex-col items-center justify-between">
        <div className="flex flex-col gap-1 text-sm">
          <p className="text-tertiary">{"{"}</p>
          {Object.keys(contact).map(
            (key) =>
              key !== "_id" && (
                <p className="ml-5" key={key}>
                  <span className="text-tertiary">
                    {'"'}
                    {key}
                    {'"'} :{" "}
                  </span>
                  <span className="text-tertiary">
                    {'"'}
                    {contact[key]}
                    {'"'}
                  </span>
                </p>
              )
          )}
          <p className="text-tertiary">{"}"}</p>
        </div>
        <div
          className="h-[400px] w-1/2 sm:w-full sm:mt-12 sm:h-[300px]"
          ref={lottieRef}
        ></div>
      </div>
    </div>
  );
}

export default Contact;
