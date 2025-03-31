import React, { useEffect } from "react";
import "./common-section.css";
import Hammer from "hammerjs";
import MicroSlider from "micro-slider";

const CommonSection = () => {
  useEffect(() => {
    // Ensure scripts load in correct order
    const loadScripts = async () => {
      const loadScript = (src) =>
        new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.async = true;
          script.onload = resolve;
          document.body.appendChild(script);
        });

      // Load external libraries
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/micro-slider@1.0.9/dist/micro-slider.min.js");

      // Your slider initialization logic
      const CaroS = document.querySelector(".Carousel-slider");
      if (CaroS) {
        const CaroSlider = new MicroSlider(CaroS, { indicators: true, indicatorText: "" });
        const hammer = new Hammer(CaroS);
        const CaroSTimer = 2000;
        let CaroAutoplay = setInterval(() => CaroSlider.next(), CaroSTimer);

        // Event Listeners
        CaroS.onmouseenter = () => clearInterval(CaroAutoplay);
        CaroS.onmouseleave = () => {
          clearInterval(CaroAutoplay);
          CaroAutoplay = setInterval(() => CaroSlider.next(), CaroSTimer);
        };
        CaroS.onclick = () => clearInterval(CaroAutoplay);
        hammer.on("swipe", () => {
          clearInterval(CaroAutoplay);
          CaroAutoplay = setInterval(() => CaroSlider.next(), CaroSTimer);
        });

        // Handle slider item clicks
        document.querySelectorAll(".slider-item").forEach((el) =>
          el.addEventListener("click", (e) => {
            e.preventDefault();
            const href = el.dataset.href;
            const target = el.dataset.target;
            if (href !== "#") window.open(href, target);
          })
        );
      }
    };

    loadScripts();

    // Cleanup function
    return () => {
      document.querySelectorAll(".slider-item").forEach((el) =>
        el.removeEventListener("click", () => {})
      );
    };
  }, []); // Runs once when the component mounts

  return (
    <div id="Carousel-slider">
      <section>
        <div className="Carousel-slider">
          <div className="slider-item superHero1" data-href="#" data-target="_self"></div>
          <div className="slider-item superHero2" data-href="#" data-target="_self"></div>
          <div className="slider-item superHero3" data-href="#" data-target="_self"></div>
          <div className="slider-item superHero4" data-href="#" data-target="_self"></div>
          <div className="slider-item superHero5" data-href="#" data-target="_self"></div>
          <div className="slider-item superHero6" data-href="#" data-target="_self"></div>
          <div className="slider-item superHero7" data-href="#" data-target="_self"></div>
        </div>
      </section>
    </div>
  );
};

export default CommonSection;
