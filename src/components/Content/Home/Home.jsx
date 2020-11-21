import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import { homeObjOne, homeObjTwo, homeObjThree } from "./Data";
import Wave from "./Wave";
import Wave2 from "./Wave2";
import Wave3 from "./Wave3";

const Home = () => {
  return (
    <>
      <Header />
      <HeroSection {...homeObjOne} />
      <Wave />
      <HeroSection {...homeObjTwo} />
      <Wave2 />
      <HeroSection {...homeObjThree} />
      <Wave />
    </>
  );
};

export default Home;
