import React from "react";
import '../styles/about.css'

import Subtitle from "./../shared/Subtitle.jsx";

const About = () => {
  return <section className="about-section">

      <i class="ri-information-2-line"></i>    
    <div>
      <div className="about-us-title">      
        <Subtitle subtitle={"About Us"} />
        <span>Welcome to Natours – Your Ultimate Travel Companion!</span>
      </div>
      <p>At Natours, we make travel planning easy and enjoyable. Our system helps travelers discover amazing destinations, book tours quickly, and create lasting memories. We provide personalized services to meet every traveler’s needs, offering curated itineraries and smooth booking experiences. With Natours, you can focus on exploring the beauty of the world while we handle the details. Whether it’s a serene escape or an adrenaline-filled adventure, we ensure every trip is special. Trust us to turn your travel dreams into reality, one unforgettable journey at a time!</p>
    </div>
    <div>
      <div className="about-us-title">      
        <Subtitle subtitle={"Our Mission"} />
      </div>
      <p>We are dedicated to offering a simple and efficient platform that connects travelers with top-quality tour packages. Our platform is designed to make planning your trips easy and stress-free. Whether you're seeking an exciting adventure, a peaceful nature escape, or a mix of both, we have the perfect options for you. We take care of every detail to ensure your journey is smooth, enjoyable, and truly memorable. With us, traveling becomes less about logistics and more about experiencing the joy of discovery!</p>
    </div>
    <div>
      <div className="about-us-title">      
        <Subtitle subtitle={"What We Offer"} />
      </div>
      <p>We have a variety of tour packages to match different interests, like adventure trips or relaxing getaways. Booking is simple and safe, with real-time updates on availability. Our website is easy to use, so browsing and booking feel smooth and hassle-free. You can check customer reviews and ratings to make the best choice. Plus, we offer secure payment options to keep your transactions safe and worry-free. Traveling has never been this easy!</p>
    </div>
    <div>
      <div className="about-us-title">      
        <Subtitle subtitle={"Why Choose Us?"} />
      </div>
      <p>We make booking simple and stress-free with an easy-to-use platform that allows quick and hassle-free reservations. Our trusted travel partners are some of the best in the industry, ensuring high-quality services for your trips. Plus, we prioritize your safety with strong data protection and secure payment options, so you can book with confidence and enjoy a worry-free experience!</p>
    </div>
    
  </section>
};

export default About;
