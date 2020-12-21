import React from "react";
import * as MaterialUI from "@material-ui/core";
import DashboardSidebarCss from "./DashboardSidebar.module.css";
import Link from "@material-ui/core/Link";

const DashboardSidebarEachWorkspace = (props) => {
  return (
    //if current clicked workspace = props.workspaceName, clicked workspace Name add active
    <Link href={`/workspace/${props.workspaceName}`}>
      <MaterialUI.Tooltip title="Create Workspace" placement="right-end">
        <div
          id={props.id}
          className={
            props.currClickWorkspace === props.workspaceName
              ? DashboardSidebarCss.workspaceIconActive
              : DashboardSidebarCss.workspaceIcon
          }
        >
          {`${props.workspaceName}`}
        </div>
      </MaterialUI.Tooltip>
    </Link>
  );
};

export default DashboardSidebarEachWorkspace;
