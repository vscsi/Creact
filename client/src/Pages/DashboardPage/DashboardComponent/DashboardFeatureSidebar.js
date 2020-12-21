import React from "react";
import * as MaterialUI from "@material-ui/core";
import DashboardSidebarCss from "./DashboardSidebar.module.css";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  NavLink,
  // useHistory,
  // useParams,
} from "react-router-dom";

const DashboardFeatureSidebar = (props) => {
  
  // console.log('dashboardfeaturessidebar props.chatroomId', props)
  return (
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
        to={`/workspace/${props.currentWorkspace}/chat?userid=${props.userId}&room=${props.chatroomId}`}
        className={DashboardSidebarCss.featureIconLink}
      >
        <MaterialUI.Tooltip title="Chatroom" placement="right-end">
          <div className={`${DashboardSidebarCss.featureIcon}`}>Chatroom</div>
        </MaterialUI.Tooltip>
      </NavLink>

      <NavLink
        to={`/workspace/${props.currentWorkspace}/docs`}
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
        to={`/workspace/${props.currentWorkspace}/tasks`}
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
        to={`/workspace/${props.currentWorkspace}/calender`}
        className={DashboardSidebarCss.featureIconLink}
      >
        <MaterialUI.Tooltip title="Chatroom" placement="right-end">
          <div className={DashboardSidebarCss.featureIcon}>Calender</div>
        </MaterialUI.Tooltip>
      </NavLink>

      <NavLink
        to={`/workspace/${props.currentWorkspace}/whiteboard`}
        className={DashboardSidebarCss.featureIconLink}
      >
        <MaterialUI.Tooltip title="Whiteboard" placement="right-end">
          <div className={DashboardSidebarCss.featureIcon}>Whiteboard</div>
        </MaterialUI.Tooltip>
      </NavLink>

      <NavLink
        to={`/workspace/${props.currentWorkspace}/video`}
        className={DashboardSidebarCss.featureIconLink}
      >
        <MaterialUI.Tooltip title="Video" placement="right-end">
          <div className={DashboardSidebarCss.featureIcon}>Video</div>
        </MaterialUI.Tooltip>
      </NavLink>
    </MaterialUI.Grid>
  );
};

export default DashboardFeatureSidebar;
