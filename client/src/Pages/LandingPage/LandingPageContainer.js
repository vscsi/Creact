import React from "react";
import NavBar from "./Nav/NavBar";

import {Link} from 'react-router-dom';
import logo from './img/logo.png'

import './sass/landingpage.scss';


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
        <Link to="" className="btn btn-white btn-animated">Open Creact App</Link>
        </div>

      </div>
    )
  }

  const Grid = () => {
    return (
      <div className="grid-test">
        <div className="row">
          <div className="col-1-of-2">Col 1 of 2</div>
          <div className="col-1-of-2">Col 1 of 2</div>
        </div>
        <div className="row">
          <div className="col-1-of-3">Col 1 of 3</div>
          <div className="col-1-of-3">Col 1 of 3</div>
          <div className="col-1-of-3">Col 1 of 3</div>
        </div>
        <div className="row">
          <div className="col-1-of-3">Col 1 of 3</div>
          <div className="col-2-of-3">Col 2 of 3</div>
        </div>
        <div className="row">
          <div className="col-1-of-4">Col 1 of 4</div>
          <div className="col-1-of-4">Col 1 of 4</div>
          <div className="col-1-of-4">Col 1 of 4</div>
          <div className="col-1-of-4">Col 1 of 4</div>
        </div>
        <div className="row">
          <div className="col-1-of-4">Col 1 of 4</div>
          <div className="col-1-of-4">Col 1 of 4</div>
          <div className="col-2-of-4">Col 2 of 4</div>
        </div>
        <div className="row">
          <div className="col-1-of-4">Col 1 of 4</div>
          <div className="col-3-of-4">Col 3 of 4</div>

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
        <Grid />
        <Card/>
        <Footer />

      </div>
    </>
  )
}

export default LandingPageContainer;