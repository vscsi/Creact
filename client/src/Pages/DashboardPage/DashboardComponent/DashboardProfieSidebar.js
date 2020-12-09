import React, { useState } from "react";
import * as MaterialUI from "@material-ui/core";
import DashboardSidebarCss from "./DashboardSidebar.module.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useHistory,
} from "react-router-dom";

function DashboardSidebar() {
  //Check if active workspace
  const [active, setActive] = useState(true);
  function checkActive() {
    if (active === true) {
      return DashboardSidebarCss.workspaceIconActive;
    }
  }

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
        <div className={DashboardSidebarCss.workspaceIconUser}>User</div>

        <div className={DashboardSidebarCss.workSpaceSeparator}></div>
        <NavLink to="/create">
          <MaterialUI.Tooltip title="Create Workspace" placement="right-end">
            <div className={DashboardSidebarCss.workspaceIcon}>
              Create workspace
            </div>
          </MaterialUI.Tooltip>
        </NavLink>

        <NavLink to="/find">
          <MaterialUI.Tooltip title="Find Workspace" placement="right-end">
            <div className={DashboardSidebarCss.workspaceIcon}>
              Find workspaces
            </div>
          </MaterialUI.Tooltip>
        </NavLink>
      </MaterialUI.Grid>

      {/* sidebar2 */}
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
          <div className={DashboardSidebarCss.workspaceIcon}>
            Find Your friends
          </div>
        </MaterialUI.Tooltip>
      </MaterialUI.Grid>
    </>
  );
}

export default DashboardSidebar;
