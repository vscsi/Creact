import React from "react";
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

const DashboardSidebarEachWorkspace = (props) => {
  return (
    <Link href={`/workspace/${props.workspaceName}`}>
    <MaterialUI.Tooltip title="Create Workspace" placement="right-end">
      <div
        id={props.id}
        className={DashboardSidebarCss.workspaceIcon}
      >
        {`${props.workspaceName}`}
      </div>
    </MaterialUI.Tooltip>
    </Link>
  );
};

export default DashboardSidebarEachWorkspace;
