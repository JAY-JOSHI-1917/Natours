import React, { useEffect } from "react";
import "./common-section.css";

const CommonSection = () => {
  useEffect(() => {
    // Dynamically load the Micro Slider script
    const microSliderScript = document.createElement("script");
    microSliderScript.src = "https://unpkg.com/micro-slider@1.0.0/dist/micro-slider.js";
    microSliderScript.async = true;
    document.body.appendChild(microSliderScript);

    // Dynamically load the Hammer.js script
    const hammerScript = document.createElement("script");
    hammerScript.src = "https://unpkg.com/hammerjs@2.0.8/hammer.min.js";
    hammerScript.async = true;
    document.body.appendChild(hammerScript);

    // Dynamically load the custom slider.js script
    const customSliderScript = document.createElement("script");
    customSliderScript.src = "/src/utils/slider.js"; // Adjusted path based on your project structure
    customSliderScript.async = true;
    document.body.appendChild(customSliderScript);

    // Cleanup scripts on component unmount
    return () => {
      document.body.removeChild(microSliderScript);
      document.body.removeChild(hammerScript);
      document.body.removeChild(customSliderScript);
    };
  }, []);

  return (
    <section className="slider">
      <div className="list">
        <div className="item item-1"></div>
        <div className="item item-2"></div>
        <div className="item item-3"></div>
        <div className="item item-4"></div>
        <div className="item item-5"></div>
        <div className="item item-6"></div>
        <div className="item item-7"></div>
      </div>
      <ul className="indicators">
        <li className="active"></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </section>
  );
};

export default CommonSection;