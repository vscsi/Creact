import React from "react";
//eslint-disable-next-line
import NavBar from "./Nav/NavBar";

import Collabsvg from "./svg/collaborate.svg";
import Onlinecollab from "./svg/OnlineCollab.svg";
import Lookingpost from "./svg/lookingpost.svg";

import { Link } from "react-router-dom";
import logo from "./img/logo.png";

import "./sass/landingpage.scss";
import "./css/icon-font.css";

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
          <Link to="/login" className="btn btn-white btn-animated">
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
              <p className="paragraph">
                Creact server keeps all your tasks. Workspace leader can assign each co-workers tasks, and keep track with the tasks on a shared calendar.
              </p>
            </div>
            <div className="col-1-of-2">
              <div className="composition">
                <img
                  src={Collabsvg}
                  alt="Collabsvg"
                  className="composition__svgimg composition__svgimg--svg_1"
                />
                <img
                  src={Onlinecollab}
                  alt="Onlinecollab"
                  className="composition__svgimg composition__svgimg--svg_2"
                />
                <img
                  src={Lookingpost}
                  alt="Lookingpost"
                  className="composition__svgimg composition__svgimg--svg_3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Features = () => {
    return (
      <div className="section-features">
        <div className="row">
          <div className="col-1-of-4">
            <div className="feature-box">
              <i className="feature-box__icon icon-basic-star"></i>
              <h4 className="heading-fourth u-margin-bottom-small">
                Explore your limits
              </h4>
              <p className="feature-box__text">
              Creact is a collaborative platform that promotes operational excellence by integrating fundamental work tools into one place.
              </p>
            </div>
          </div>
          <div className="col-1-of-4">
            <div className="feature-box">
              <i className="feature-box__icon icon-basic-todolist-pencil"></i>
              <h4 className="heading-fourth u-margin-bottom-small">
                Meet your goals
              </h4>
              <p className="feature-box__text">
              With Creact, you can create a workspace to collaborate on the same document with your teammates in real-time. Instantly connect with them on a video call, or messaging them in the chatroom, which are all in-built in our app, all in one place.
              </p>
            </div>
          </div>
          <div className="col-1-of-4">
            <div className="feature-box">
              <i className="feature-box__icon icon-basic-calendar"></i>
              <h4 className="heading-fourth u-margin-bottom-small">
                Find your team
              </h4>
              <p className="feature-box__text">
                Creact centralises resources for better teamwork dynamics, elevate problem solving efficiency.  You can share and draw your ideas on a real-time collaborative whiteboard straight away.
              </p>
            </div>
          </div>
          <div className="col-1-of-4">
            <div className="feature-box">
              <i className="feature-box__icon icon-basic-world"></i>
              <h4 className="heading-fourth u-margin-bottom-small">
                Live a remote life
              </h4>
              <p className="feature-box__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Card = () => {
    return (
      <div className="section-products">
        <div className="u-center-text u-margin-bottom-huge">
          <h2 class="heading-secondary">Start your Creact today</h2>
        </div>
        <div className="row">
          <div className="col-1-of-3">
            <div className="card">
              <div className="card__side card__side--front">
                <div className="card__picture card__picture--1">&nbsp;</div>
                <h4 className="card__heading">
                  <span className="card__heading-span card__heading-span--1">
                    Starter Plan
                  </span>
                </h4>
                <div className="card__details">
                  <ul>
                    <li>3 limited workspace</li>
                    <li>No storage for collaborate doc</li>
                    <li>Limited usage of video call</li>
                    <li>Great for every one for try out</li>
                  </ul>
                </div>
              </div>
              <div className="card__side card__side--back card__side--back-1">
                <div className="card__cta">
                  <div className="card__price-box">
                    <p className="card__price-only">Now</p>
                    <p className="card__price-value">$ Free</p>
                  </div>
                  <Link to="/login" className="btn btn-white">
                    Start now!
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1-of-3">
            <div className="card">
              <div className="card__side card__side--front">
                <div className="card__picture card__picture--2">&nbsp;</div>
                <h4 className="card__heading">
                  <span className="card__heading-span card__heading-span--2">
                    Monthly plan
                  </span>
                </h4>
                <div className="card__details">
                  <ul>
                    <li>5 workspace</li>
                    <li>Storage for document</li>
                    <li>Unlimited viedo call</li>
                    <li>Great for ingenious people</li>
                  </ul>
                </div>
              </div>
              <div className="card__side card__side--back card__side--back-2">
                <div className="card__cta">
                  <div className="card__price-box">
                    <p className="card__price-only">Only</p>
                    <p className="card__price-value">$ 19/month</p>
                  </div>
                  <Link to="/login" className="btn btn-white">
                    Start free trial now!
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1-of-3">
            <div className="card">
              <div className="card__side card__side--front">
                <div className="card__picture card__picture--3">&nbsp;</div>
                <h4 className="card__heading">
                  <span className="card__heading-span card__heading-span--3">
                    Yearly plan
                  </span>
                </h4>
                <div className="card__details">
                  <ul>
                    <li>File upload and download features</li>
                    <li>Extra storage space</li>
                    <li>All monthly plan features </li>
                    <li>Special discount</li>
                  </ul>
                </div>
              </div>
              <div className="card__side card__side--back card__side--back-3">
                <div className="card__cta">
                  <div className="card__price-box">
                    <p className="card__price-only">Only</p>
                    <p className="card__price-value">$ 90/year</p>
                  </div>
                  <Link to="/login" className="btn btn-white">
                    Start free trial now!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Footer = (props) => {
    return (
      <div className="footer" >
        <div className="footer__logo-box">
          <img src={logo} alt="logo" className="footer__logo"/>
        </div>
        <div className="row">
          <div className="col-1-of-2">
            <div className="footer__navigation">
              <ul className="footer__list">
                <li className="footer__item"><Link to="/" className="footer__link" >Company</Link></li>
                <li className="footer__item"><Link to="/" className="footer__link" >Contact us</Link></li>
                <li className="footer__item"><Link to="/" className="footer__link" >Carreers</Link></li>
                <li className="footer__item"><Link to="/" className="footer__link" >Privacy policy</Link></li>
                <li className="footer__item"><Link to="/" className="footer__link" >Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="col-1-of-2">
            <p className="footer__copyright">
              Built by Craect team. Copyright &copy; by Creact team. Landing page desgin credit to the original desginer, Jonas Schmedtmann.
            </p>
          </div>
        </div>
      </div>
    )
  };

  return (
    <>
    <div className="hhtml">

      {/* <NavBar/> */}
      <div id="body">
        <Header />
        <Main />
        <Features />
        <Card />
        <Footer />
      </div>
    </div>
      
    </>
  );
}

export default LandingPageContainer;
