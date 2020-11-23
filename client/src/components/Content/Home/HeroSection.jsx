import React from "react";
import "../../../css/herosection.css";
import hero_pic_1 from '../../../css/images/header-1.jpeg';


const HeroSection = () => {
  return (
    <div className="hero-wrapper">
      <div className="hero-img">
        <img src={hero_pic_1} alt="hero-pic-1"/>
      </div>
      <div className="hero-content">
        <h1>When Working is no longer a suffer anymore...</h1>
        <p>Then you will know why people can OT till 12am without extra paid... Is that true?</p>
      </div>
    </div>
  );
};

export default HeroSection;
