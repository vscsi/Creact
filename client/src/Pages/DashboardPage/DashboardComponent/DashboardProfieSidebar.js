import React from "react";
import * as MaterialUI from "@material-ui/core";
import DashboardSidebarCss from "./DashboardSidebar.module.css";
import {
  NavLink,
  useHistory,
} from "react-router-dom";
import Link from "@material-ui/core/Link";
import DashboardSidebarEachWorkspace from "./DashboardSidebarEachWorkspace";
import Axios from "axios";
//eslint-disable-next-line
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
//eslint-disable-next-line
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CreateIcon from '@material-ui/icons/Create';


function DashboardProfileSidebar(props) {

  const handleLogout = () => {
    try {
      //1. remove localstorage of JWT
      // console.log("Handling logout");
      //should communicate with checkLoginUsers route
      removeUser(props.name);
      localStorage.removeItem("token");
      localStorage.removeItem("userName");

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
        // console.log("has removed the userName in login_users");
        // console.log(`currUsers is below`);
        // console.log(res.data.currUsers);
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
        justify="flex-start"
        direction="column"
        className={DashboardSidebarCss.sideBarBorder}
      >
        <Link href="/profile">
          <div className={DashboardSidebarCss.workspaceIconUser}>
            {props.name}
          </div>
        </Link>

        <div className={DashboardSidebarCss.workSpaceSeparator}></div>

        <div className={DashboardSidebarCss.displayIconsWrap}>
          <div className={DashboardSidebarCss.displayIcons}>
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
          </div>
          <div className={DashboardSidebarCss.displayIcons}>
            <NavLink
              to="/profile/create"
              activeClassName={DashboardSidebarCss.isActive}
            >
              <MaterialUI.Tooltip
                title="Create Workspace"
                placement="right-end"
              >
                <div className={DashboardSidebarCss.workspaceIcon}>
                  <CreateIcon />
                </div>
              </MaterialUI.Tooltip>
            </NavLink>

            <NavLink
              to="/profile/search"
              activeClassName={DashboardSidebarCss.isActive}
            >
              <MaterialUI.Tooltip title="Find Workspace" placement="right-end">
                <div className={DashboardSidebarCss.workspaceIcon}>
                  <SearchIcon />
                </div>
              </MaterialUI.Tooltip>
            </NavLink>

            <MaterialUI.Tooltip
              title="Logout"
              placement="right-end"
              activeClassName={DashboardSidebarCss.isActive}
            >
              <div
                className={DashboardSidebarCss.workspaceIcon}
                onClick={handleLogout}
              >
                Logout
              </div>
            </MaterialUI.Tooltip>
          </div>
        </div>
      </MaterialUI.Grid>
    </>
  );
}

export default DashboardProfileSidebar;
