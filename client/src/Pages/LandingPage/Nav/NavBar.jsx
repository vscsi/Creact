import React, { useState } from "react";
import "../../../css/index.css";
import "../../../css/nav.css";
import Burger from "./Burger";
import RightBar from "./RightBar";
import { BrowserRouter as Router, Link, Route,Switch, useHistory } from "react-router-dom";
import Download from "../Content/Download/Download";
import Price from "../Content/Price/Price";
import Reason from "../Content/Reason/Reason";
import Safety from "../Content/Safety/Safety";
import Support from "../Content/Support/Support";
import Home from "../Content/Home/Home";
// import LoginContainer from"../.././LoginPage/LoginContainer"

const NavBar = (props) => {
  const [isClicked, setClicked] = useState(false);
  const [burger, setBurger] = useState(false);
  function handleClick() {
    setClicked((prev) => {
      return !prev;
    });
  }
  const showButton = () => {
    if (window.innerWidth <= 1000) {
      setBurger(true); //zoom in
    } else {
      setBurger(false); //zoom out
    }
  };
  window.addEventListener("resize", showButton);
  
  const history= useHistory();


  return (
    <>
    <Router>
    <nav>
      <div className="nav-left">
        <Link to="/">
          <h1>CREACT</h1>
        </Link>
      </div>
      {/* <div className="nav-middle">
        <Link to="/download">
          <li>Download</li>
        </Link>
        <Link to="/reason">
          <li>Why choose us?</li>
        </Link>
        <Link to="/price">
          <li>Price</li>
        </Link>
        <Link to="/safety">
          <li>Safety</li>
        </Link>
        <Link to="/support">
          <li>Support</li>
        </Link>
      </div> */}
      <div className="nav-right">
        <Link to="/login">
          <button onClick={
            ()=>{
              history.push('/login')
            }
          }>Open App</button>
        </Link>
        {burger ? <Burger handleClick={handleClick} /> : ""}
        {isClicked ? <RightBar handleClick={handleClick} /> : ""}
      </div>
    </nav> 
    <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/download" component={Download} />
          <Route path="/reason" component={Reason} />
          <Route path="/price" component={Price} />
          <Route path="/safety" component={Safety} />
          <Route path="/support" component={Support} /> */}
    </Switch>
    </Router>
    </>
  );
};

export default NavBar; 
