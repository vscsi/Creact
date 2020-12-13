import React, { useState, useEffect } from "react";
import * as MaterialUI from "@material-ui/core";
import DashboardSidebarCss from "./DashboardSidebar.module.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
  useHistory,
} from "react-router-dom";
import Link from "@material-ui/core/Link";

function DashboardProfileSidebar(props) {

  const handleLogout = () => {
    try {
      //1. remove localstorage of JWT
      console.log("Handling logout");
      localStorage.removeItem("token");
      // console.log(localStorage.getItem('token'));
      // //2. redirect to landing page
      history.push("/");
      window.location.reload();
      // //3. set logout state to be false
    } catch (error) {
      console.error(error.message);
    }
  };
  
  useEffect(()=>{
    console.log(props)
  }, [])

  const history = useHistory();

  return (
    <>
      {/* sidebar1 */}
      <MaterialUI.Grid
        container
        xs={1}
        spacing={0}
        alignItems="center"
        justify="flex-start"
        direction="column"
        className={DashboardSidebarCss.sideBarBorder}
      >
        <Link href="/profile">
          <div className={DashboardSidebarCss.workspaceIconUser}>
            {props.name}
          </div>
        </Link>

        <div className={DashboardSidebarCss.workSpaceSeparator}></div>

        {props.workspaces.map((item, index) => {
          return (
            <Link href={`/workspace/${item}`} key={index}>
              <MaterialUI.Tooltip
                title="Create Workspace"
                placement="right-end"
              >
                <div className={DashboardSidebarCss.workspaceIcon}>{item}</div>
              </MaterialUI.Tooltip>
            </Link>
          );
        })}

        <NavLink to="/profile/create">
          <MaterialUI.Tooltip title="Create Workspace" placement="right-end">
            <div className={DashboardSidebarCss.workspaceIcon}>
              Create workspace
            </div>
          </MaterialUI.Tooltip>
        </NavLink>

        <NavLink to="/profile/find">
          <MaterialUI.Tooltip title="Find Workspace" placement="right-end">
            <div className={DashboardSidebarCss.workspaceIcon}>
              Find workspaces
            </div>
          </MaterialUI.Tooltip>
        </NavLink>

        <MaterialUI.Tooltip title="Logout" placement="right-end">
          <div
            className={DashboardSidebarCss.workspaceIcon}
            onClick={handleLogout}
          >
            Logout
          </div>
        </MaterialUI.Tooltip>
      </MaterialUI.Grid>
    </>
  );
}

export default DashboardProfileSidebar;
