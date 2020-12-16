import React from "react";
import * as MaterialUI from "@material-ui/core";
import DashboardSidebarCss from "./DashboardSidebar.module.css";
<<<<<<< HEAD
=======

>>>>>>> 065b9c382f31955807f936651ea95c5c8a0f7f4d
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
