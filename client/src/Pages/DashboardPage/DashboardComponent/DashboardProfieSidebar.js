import React from "react";
import * as MaterialUI from "@material-ui/core";
import DashboardSidebarCss from "./DashboardSidebar.module.css";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  // Redirect,
  NavLink,
  useHistory,
} from "react-router-dom";
import Link from "@material-ui/core/Link";
import DashboardSidebarEachWorkspace from "./DashboardSidebarEachWorkspace";
// import { getCurrentWorkspace } from "../../../services/getCurrentWorkspace";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CreateIcon from '@material-ui/icons/Create';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';


function DashboardProfileSidebar(props) {
  const useStyles = makeStyles((theme) => ({
    iconButton: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },

    /**drawer */
    /**overriding drawer properties */
    paper:{
      background: "#2c2e31",
      width: 150,
    },

    /**Item icon */
    topIconSpacing:{
      margin: '0 0.5rem 0 0.3rem',
      padding: '0 0 0 0.2rem'
    },
    
    bottomIconSpacing:{
      margin: '0 0.5rem 0 0.3rem',
      padding: '0 0 0 0.5rem'
    },

    /**Item text */
    listTextSize:{
      fontSize: '0.8rem',
      padding: '0 0.2rem 0 0',
    },

    /**divider */
    dividerHeight: {
      height: '0.5vh',
    },

  }));
  const classes = useStyles();

  const handleLogout = () => {
    try {
      //1. remove localstorage of JWT
      console.log("Handling logout");
      //should communicate with checkLoginUsers route
      removeUser(props.name);
      localStorage.removeItem("token");
      localStorage.removeItem("userName");

      // console.log(localStorage.getItem('token'));
      // //2. redirect to landing page
      history.push("/");
      window.location.reload();
      // //3. set logout state to be false
    } catch (error) {
      console.error(error.message);
    }
  };

  const removeUser = (userName) => {
    try {
      Axios.delete(`http://localhost:4000/checklogoutusers/${userName}`, {
      // Axios.delete(`${process.env.REACT_APP_API_SERVER}/checklogoutusers/${userName}`, {
        headers: { "x-access-token": localStorage.getItem("token") },
      }).then((res) => {
        console.log("has removed the userName in login_users");
        console.log(`currUsers is below`);
        console.log(res.data.currUsers);
        localStorage.setItem(
          `${res.data.user}`, //eslint-disable-next-line
          `${res.data.user} is deleted in server`
        );
        localStorage.setItem(
          `currentUsers`,
          JSON.stringify(res.data.currUsers)
        );
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const history = useHistory();

  return (
    <>
      {/* sidebar1 */}
      <MaterialUI.Grid
        container
        xs={1}
        spacing={0}
        alignItems="center"
        justify="space-between"
        direction="column"
      >
        <Drawer
        classes={{paper: classes.paper}}
        variant="permanent"
        >

          <Link href="/profile"  style={{ textDecoration: 'none' }}>
            <div className={DashboardSidebarCss.workspaceIconUser}>
              {props.name}
            </div>
          </Link>

          <Divider 
            className = {classes.dividerHeight}
          />
          {/* sidebar top */}
          <div className={DashboardSidebarCss.displayIconsWrap}>
            <div>
                {props.workspaces.map((item, index) => {
                  return (
                    <DashboardSidebarEachWorkspace
                      id={index}
                      key={index}
                      workspaceName={item.eachWorkspaceName}
                      currClickWorkspace={props.currClickWorkspace}
                    />
                  );
                })}

              {/* Creating ws */}
              <ListItem button>
                <NavLink
                  to="/profile/create"
                  activeClassName={DashboardSidebarCss.isActive}
                  style={{ textDecoration: 'none' }}
                >
                  <MaterialUI.Tooltip
                    title="Create Workspace"
                    placement="right-end"
                  >
                    <div className={DashboardSidebarCss.workspaceIcon}>
                      <CreateIcon className={classes.topIconSpacing}/>
                      <ListItemText classes= {{primary: classes.listTextSize}}>Create workspace</ListItemText>
                    </div>
                  </MaterialUI.Tooltip>
                </NavLink>
              </ListItem>
            {/* Sidebar bottom */}
              {/* searching workspace */}
              <ListItem button>
                <NavLink
                  to="/profile/search"
                  activeClassName={DashboardSidebarCss.isActive}
                  style={{ textDecoration: 'none' }}
                  >
                  <MaterialUI.Tooltip title="Find Workspace" placement="right-end">
                    <div className={DashboardSidebarCss.workspaceIcon}>
                      <SearchIcon className={classes.topIconSpacing}/>
                      <ListItemText classes= {{primary: classes.listTextSize}}>Search workspace</ListItemText>
                    </div>
                  </MaterialUI.Tooltip>
                </NavLink>
                </ListItem>
            </div>


              {/* Logout */}
            <div className = {DashboardSidebarCss.displayIconsBottom}>
              <ListItem button>
                <MaterialUI.Tooltip
                  title="Logout"
                  placement="right-end"
                  activeClassName={DashboardSidebarCss.isActive}
                >
                  <div
                    className={DashboardSidebarCss.workspaceIcon}
                    onClick={handleLogout}
                  >
                    <ExitToAppIcon className={classes.bottomIconSpacing}/>
                    <ListItemText classes= {{primary: classes.listTextSize}}>Logout</ListItemText>
                  </div>
                </MaterialUI.Tooltip>
              </ListItem>
            </div>
          </div>
          </Drawer>
      </MaterialUI.Grid>
    </>
  );
}

export default DashboardProfileSidebar;
