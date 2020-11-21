import React from "react";
import "../../../css/herosection.css";

const HeroSection = ({
  flexReverse,
  imgSrc,
  contentH1,
  contentP,
  waveShape,
}) => {
  return (
    <>
      <div className={waveShape === "wave" ? "hero" : "hero2"}>
        <div className={flexReverse ? "hero-wrapper-reverse" : "hero-wrapper"}>
          <div className="hero-img">
            <img src={imgSrc} alt="hero-pic-1" />
          </div>
          <div className="hero-content">
            <h1>{contentH1}</h1>
            <p>{contentP}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
