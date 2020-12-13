import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
  useHistory,
} from "react-router-dom";

const DashboardAddSocial = () => {
  return (
    <>
      <button>Search Friends</button>
      <NavLink to="/workspace/search">Search Workspace</NavLink>
    </>
  );
};

export default DashboardAddSocial;
