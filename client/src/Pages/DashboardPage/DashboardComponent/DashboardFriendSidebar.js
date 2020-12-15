import React from "react";
import * as MaterialUI from "@material-ui/core";
import DashboardSidebarCss from "./DashboardSidebar.module.css";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   NavLink,
//   useHistory,
// } from "react-router-dom";

const DashboardFriendSidebar = () => {
  return (
    <>
      <MaterialUI.Grid
        container
        md={2}
        spacing={0}
        alignItems="center"
        justify="flex-start"
        direction="column"
        className={`${DashboardSidebarCss.sideBarBorder} ${DashboardSidebarCss.sidebar2Background}`}
      >
        <MaterialUI.Tooltip title="Add friends" placement="right-end">
          <div className={DashboardSidebarCss.workspaceIcon}>Friend A</div>
        </MaterialUI.Tooltip>
        <MaterialUI.Tooltip title="Add friends" placement="right-end">
          <div className={DashboardSidebarCss.workspaceIcon}>Friend A</div>
        </MaterialUI.Tooltip>
        <MaterialUI.Tooltip title="Add friends" placement="right-end">
          <div className={DashboardSidebarCss.workspaceIcon}>Friend A</div>
        </MaterialUI.Tooltip>
        <MaterialUI.Tooltip title="Add friends" placement="right-end">
          <div className={DashboardSidebarCss.workspaceIcon}>Friend A</div>
        </MaterialUI.Tooltip>
        <MaterialUI.Tooltip title="Add friends" placement="right-end">
          <div className={DashboardSidebarCss.workspaceIcon}>Friend A</div>
        </MaterialUI.Tooltip>
        <MaterialUI.Tooltip title="Add friends" placement="right-end">
          <div className={DashboardSidebarCss.workspaceIcon}>
            Find Your friends
          </div>
        </MaterialUI.Tooltip>
      </MaterialUI.Grid>
    </>
  );
};

export default DashboardFriendSidebar;
