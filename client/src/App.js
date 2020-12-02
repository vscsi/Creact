import React, { useState, useEffect } from "react";
import DashboardContainer from "./Pages/DashboardPage/DashboardContainer";
import LandingPageContainer from "./Pages/LandingPage/LandingPageContainer";
import LoginContainer from "./Pages/LoginPage/LoginContainer";

function App() {
  const [isLogin, setLogin] = useState(false);
  function handleLogin() {
    console.log("Render from App.js");
    setLogin((prev) => !prev);
  }
  return (
    <>
      {/* {isLogin ? (
        <LoginContainer />
      ) : (
        <LandingPageContainer handleLogin={handleLogin} />
      )} */}
      <DashboardContainer />
    </>
  );
}

export default App;
