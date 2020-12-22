import React from "react";
import * as MaterialUI from "@material-ui/core";
import DashboardSidebarCss from "./DashboardSidebar.module.css";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  NavLink,
  // useHistory,
} from "react-router-dom";
import Link from "@material-ui/core/Link";


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
      >
        <Link href="/profile">
          <div className={DashboardSidebarCss.workspaceIconUser}>
            {props.name}
          </div>
        </Link>

        <div className={DashboardSidebarCss.workSpaceSeparator}></div>

        {props.workspaces.map((item, index) => {
          return (
            <NavLink to={`/workspace/${item}`} key={index}>
              <MaterialUI.Tooltip
                title="Create Workspace"
                placement="right-end"
              >
                <div className={DashboardSidebarCss.workspaceIcon}>{item}</div>
              </MaterialUI.Tooltip>
            </NavLink>
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
      </MaterialUI.Grid>
    </>
  );


export default DashboardSidebar;
