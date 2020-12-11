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
        <NavLink to="/profile">
          <div className={DashboardSidebarCss.workspaceIconUser}>User</div>
        </NavLink>

        <div className={DashboardSidebarCss.workSpaceSeparator}></div>

        <MaterialUI.Tooltip title="Workspace 1" placement="right-end">
          <div
            className={`${DashboardSidebarCss.workspaceIcon} ${checkActive()}`}
          >
            Work space 1
          </div>
        </MaterialUI.Tooltip>

        <MaterialUI.Tooltip title="Workspace 2" placement="right-end">
          <div className={DashboardSidebarCss.workspaceIcon}>Work space 2</div>
        </MaterialUI.Tooltip>

        <MaterialUI.Tooltip title="Workspace 3" placement="right-end">
          <div className={DashboardSidebarCss.workspaceIcon}>Work space 3</div>
        </MaterialUI.Tooltip>
        <MaterialUI.Tooltip title="Create Workspace" placement="right-end">
          <div className={DashboardSidebarCss.workspaceIcon}>
            Create workspace
          </div>
        </MaterialUI.Tooltip>
      </MaterialUI.Grid>

      {/* sidebar2 */}
      <MaterialUI.Grid
        container
        md={2}
        spacing={0}
        alignItems="center"
        justify="space-around"
        direction="column"
        className={`${DashboardSidebarCss.sideBarBorder} ${DashboardSidebarCss.sidebar2Background}`}
      >
        <NavLink
          to={`/workspace/chat?userid=3&room=1`}
          className={DashboardSidebarCss.featureIconLink}
        >
          <MaterialUI.Tooltip title="Chatroom" placement="right-end">
            <div className={`${DashboardSidebarCss.featureIcon}`}>Chatroom</div>
          </MaterialUI.Tooltip>
        </NavLink>

        <NavLink
          to="/workspace/docs"
          className={DashboardSidebarCss.featureIconLink}
        >
          <MaterialUI.Tooltip
            title="Collaboration document"
            placement="right-end"
          >
            <div className={DashboardSidebarCss.featureIcon}>
              Collaboration Document
            </div>
          </MaterialUI.Tooltip>
        </NavLink>

        <NavLink
          to="/workspace/dropbox"
          className={DashboardSidebarCss.featureIconLink}
        >
          <MaterialUI.Tooltip title="Dropbox" placement="right-end">
            <div className={DashboardSidebarCss.featureIcon}>Dropbox</div>
          </MaterialUI.Tooltip>
        </NavLink>

        <NavLink
          to="/workspace/tasks"
          className={DashboardSidebarCss.featureIconLink}
        >
          <MaterialUI.Tooltip
            title="Collaboration Task List"
            placement="right-end"
          >
            <div className={DashboardSidebarCss.featureIcon}>
              Collaboration Task List
            </div>
          </MaterialUI.Tooltip>
        </NavLink>

        <NavLink
          to="/workspace/calendar"
          className={DashboardSidebarCss.featureIconLink}
        >
          <MaterialUI.Tooltip title="Chatroom" placement="right-end">
            <div className={DashboardSidebarCss.featureIcon}>Calender</div>
          </MaterialUI.Tooltip>
        </NavLink>

        <NavLink
          to="/workspace/whiteboard"
          className={DashboardSidebarCss.featureIconLink}
        >
          <MaterialUI.Tooltip title="Whiteboard" placement="right-end">
            <div className={DashboardSidebarCss.featureIcon}>Whiteboard</div>
          </MaterialUI.Tooltip>
        </NavLink>

        <NavLink
          to="/workspace/video"
          className={DashboardSidebarCss.featureIconLink}
        >
          <MaterialUI.Tooltip title="Video" placement="right-end">
            <div className={DashboardSidebarCss.featureIcon}>Video</div>
          </MaterialUI.Tooltip>
        </NavLink>
      </MaterialUI.Grid>
    </>
  );
}

export default DashboardSidebar;
