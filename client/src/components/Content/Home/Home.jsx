import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Aux from "../../../hoc/Auxiliary"

const Home = () => {
  return (
    <Aux>
      <Header />
      <HeroSection />
    </Aux>
  );
};

export default Home;
