import React, { useState, useEffect } from "react";
import DashboardContainer from "./Pages/DashboardPage/DashboardContainer";
import LandingPageContainer from "./Pages/LandingPage/LandingPageContainer";
import LoginContainer from "./Pages/LoginPage/LoginContainer";
import ChatLogin from "./Pages/chatroom/components/Join/Join";
import Chat from "./Pages/chatroom/components/Chat/Chat";
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";



function App() {
  const [isLogin, setLogin] = useState(false);
  function handleLogin() {
    console.log("Render from App.js");
    setLogin((prev)=>{
      return !prev;
    })
  }
    return(
      <Router>
        <Switch>
          <Route path="/" exact component={LandingPageContainer} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/workspace" component={DashboardContainer} />
        </Switch>
      </Router>
    )
}

export default App