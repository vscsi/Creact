import React from "react";
import NavBar from "./Nav/NavBar";

import Collabsvg from './svg/collaborate.svg'
import { Link } from "react-router-dom";
import logo from "./img/logo.png";

import "./sass/landingpage.scss";

function LandingPageContainer(props) {
  const Header = () => {
    return (
      <div className="header">
        <div className="logo-box">
          <img src={logo} alt="logo" className="logo" />
        </div>

        <div className="text-box">
          <h1 className="heading-primary">
            <span className="heading-primary-main">Creact</span>
            <span className="heading-primary-sub">
              is where creativity happens
            </span>
          </h1>
          <Link to="" className="btn btn-white btn-animated">
            Open Creact App
          </Link>
        </div>
      </div>
    );
  };

  const Main = () => {
    return (
      <div className="section-about">
        <div className="u-center-text u-margin-bottom-big">
          <h2 class="heading-secondary">
            Exciting tools for resourceful people
          </h2>
          </div>
          <div className="grid-test">
            <div className="row">
              <div className="col-1-of-2">
                <h3 className="heading-tertiary u-margin-bottom-medium">
                  Keep track of your task
                </h3>
                <p className="paragraph" >
                  Creact server keep all your tasks which can be assigned or show other colleague what are you working on.  
                </p>
                </div>
              <div className="col-1-of-2">
                <div className="composition" >
                  <img src={Collabsvg} alt="Collabsvg" className="svg"  />
                </div>
                </div>
            </div>
          </div>
        
      </div>
    );
  };

  const Card = (props) => {
    return <div className={props.className}></div>;
  };

  const Footer = (props) => {
    return <div className="footer"></div>;
  };

  return (
    <>
      {/* <NavBar/> */}
      <div id="body">
        <Header />
        <Main />
        <Card />
        <Footer />
      </div>
    </>
  );
}

export default LandingPageContainer;
