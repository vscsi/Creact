import React, { useState, useEffect, useContext } from "react";
import DashboardContainer from "./Pages/DashboardPage/DashboardContainer";
import LandingPageContainer from "./Pages/LandingPage/LandingPageContainer";
import LoginContainer from "./Pages/LoginPage/LoginContainer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [isLogin, setLogin] = useState(false);
  function handleLogin() {
    console.log("Render from App.js");
    setLogin((prev) => {
      return !prev;
    });
  }

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPageContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/workspace" component={DashboardContainer} />
      </Switch>
    </Router>
  );
}

export default App;
