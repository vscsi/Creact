import React from "react";
import NavBar from "./Nav/NavBar";

import logo from './img/logo.png'

import './landingpage.css';


function LandingPageContainer(props) {

 
  const Header = () => {
    return (
      <div className='header'>
        <div className= "logo-box">
          <img src={logo} alt="logo" className="logo"/>
        </div>
      
      <div className="text-box">
        <h1 className='heading-primary'>
          <span className="heading-primary-main">Creact</span>
          <span className="heading-primary-sub">is where creativity happens</span>
        </h1>
      </div>

        
      </div>
    )
  }

  const Card = (props) => {
    return (
      <div className={props.className} >

      </div>
    )
  }

  const Footer = (props) => {
    return (
      <div className="footer" >


      </div>
    )
  }



  return (
    <>  
      {/* <NavBar/> */}
      <div id = "body">
        <Header />
        <Card/>
        <Footer />

      </div>
    </>
  )
}

export default LandingPageContainer;