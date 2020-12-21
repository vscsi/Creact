import React from "react";
import {
  NavLink,
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
