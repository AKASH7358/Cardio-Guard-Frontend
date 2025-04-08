import React, { useEffect, useState } from "react";
import logo from "../navbar/static/cardio-guard-logo.png";
import "./hero.css";
import "./btn.css";
import Type from "../type/type";
import { Link } from "react-router-dom";
import { GlitchImage } from "react-glitch-image";

const Hero = () => {
    const [width, setWidth] = useState('40%'); 
  
    const handleResize = () => {
      if (window.innerWidth >= 350 && window.innerWidth <= 850) {
        setWidth('90%');
      } else {
        setWidth('40%');
      }
    };
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <div className="hero-cont">
      <section className="hero" id="hero">
        <div className="presents">
          AI-powered <span className="ai">Heart Disease Prediction</span>
          <br />
          <span className="pr">by Cardio Guard</span>
        </div>
        <GlitchImage
        className="glitch-image"
          image={logo}
          width={width}
          animationDuration={400}
          animationInterval={3000}
          activeFxOnHover={false}
          activeFxOnInterval={true}
        />
      </section>
      <Type dt={["AI-driven heart health insights", "Early detection, better prevention", "Empowering healthcare with AI", "Your heart health, our priority"]} />
      <div className="desc-cont">
        <p className="desc">
        <span>Predict and Prevent</span> – Cardio Guard helps in early detection of heart disease using advanced deep learning models.
        </p>
      </div>
      <hr />
      <div className="butn-container">
        <Link to="/prediction">
          <button className="butn">Check Your Heart Health</button>
        </Link>
      </div>

      <div className="video-container">
        <iframe
            src="https://res.cloudinary.com/dozq6vspe/video/upload/v1741373893/invideo-ai-1080_AI_Revolution__Predicting_Heart_Disease_2025-03-07_a47deb.mp4"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Cardio Guard AI Overview"
        ></iframe>
      </div>

      <hr />
    </div>
  );
};

export default Hero;
