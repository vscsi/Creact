import React, { useState, useEffect } from "react";
import DashboardContainer from "./Pages/DashboardPage/DashboardContainer";
import DashboardProfileContainer from "./Pages/DashboardPage/DashboardProfileContainer";
import LandingPageContainer from "./Pages/LandingPage/LandingPageContainer";
import LoginContainer from "./Pages/LoginPage/LoginContainer";
import ErrorContainer from "./Pages/ErrorPage/ErrorContainer";
import RegisterContainer from "./Pages/RegisterPage/RegisterContainer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
  Redirect,
} from "react-router-dom";
import Axios from "axios";

function App() {
  const [isLogin, setLogin] = useState(false);

  //1. if already have token stored in localstorage, send get request to server, check if the token is correct, if yes, setLogin to true
  const isAuthenticate = () => {
    Axios.get("http://localhost:4000/isUserAuth", {
      // Axios.get(`${process.env.REACT_APP_API_SERVER}/isUserAuth`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((res) => {
      // console.log(res);
      if (res.data.userId !== undefined) {
        setLogin(true);
      }
    });
  };

  useEffect(() => {
    isAuthenticate();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPageContainer} />
        <Route exact path="/login">
          {isLogin ? <Redirect to="/profile" /> : <LoginContainer />}
        </Route>
        <Route exact path="/register" component={RegisterContainer} />
        <Route exact path="/profile">
          {isLogin && <DashboardProfileContainer />}
        </Route>{" "}
        {/* <Route
          path="/workspace"
          exact
          component={isLogin && DashboardContainer}
        /> */}
        <Route
          path="/workspace/:workspaceName/"
          component={isLogin && DashboardContainer}
        />
        <Route path="*" component={ErrorContainer} />
      </Switch>
    </Router>
  );
}

export default App;
