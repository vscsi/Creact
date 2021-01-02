import React from "react";
import * as MaterialUI from "@material-ui/core";
import DashboardSidebarCss from "./DashboardSidebar.module.css";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText
} from '@material-ui/core';

const DashboardSidebarEachWorkspace = (props) => {
  const useStyles = makeStyles((theme) => ({
    /**Item text */
    listTextSize:{
      fontSize: '1rem',
      margin: '0 0 0 1rem',
      padding: '0 0 0 0.2rem',
      // whiteSpace: 'nowrap'
    },
  }));
  const classes = useStyles();

  return (
    //if current clicked workspace = props.workspaceName, clicked workspace Name add active
    <Link href={`/workspace/${props.workspaceName}`}  style={{ textDecoration: 'none' }}>
      <MaterialUI.Tooltip title="Create Workspace" placement="right-end">
        <ListItem>
          <ListItemText 
            id={props.id}
            classes= {{primary: classes.listTextSize}}
            // style={{whiteSpace: "nowrap"}}
            className={
              props.currClickWorkspace === props.workspaceName
                ? `${DashboardSidebarCss.workspaceIconActive}`
                : `${DashboardSidebarCss.workspaceIcon}`
            }
          >
            {`${props.workspaceName}`}
          </ListItemText>
        </ListItem>
      </MaterialUI.Tooltip>
    </Link>
  );
};

export default DashboardSidebarEachWorkspace;
