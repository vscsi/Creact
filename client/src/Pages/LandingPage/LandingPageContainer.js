import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./Nav/NavBar";
import Download from "./Content/Download/Download";
import Price from "./Content/Price/Price";
import Reason from "./Content/Reason/Reason";
import Safety from "./Content/Safety/Safety";
import Support from "./Content/Support/Support";
import Home from "./Content/Home/Home";
import Login from "./Content/Login/Login";
import Aux from "../../hoc/Auxiliary";

function LandingPageContainer(props) {
  return (
    <Aux>
      <Router>
        <NavBar handleLogin={props.handleLogin} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/download" component={Download} />
          <Route path="/reason" component={Reason} />
          <Route path="/price" component={Price} />
          <Route path="/safety" component={Safety} />
          <Route path="/support" component={Support} />
        </Switch>
      </Router>
    </Aux>
  );
}

export default LandingPageContainer;
