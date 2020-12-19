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

function DashboardProfileSidebar(props) {
  //Check if active workspace

  // const [active, setActive] = useState(true);
  // function checkActive() {
  //   if (active === true) {
  //     return DashboardSidebarCss.workspaceIconActive;
  //   }
  // }

  const handleLogout = () => {
    try {
      //1. remove localstorage of JWT
      console.log("Handling logout");
      //should communicate with checkLoginUsers route
      removeUser(localStorage.getItem("userName"));
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

        {props.workspaces.map((item, index) => {
          return (
            <DashboardSidebarEachWorkspace
              id={index}
              key={index}
              workspaceName={item.eachWorkspaceName}
            />
          );
        })}

        <NavLink
          to="/profile/create"
          activeClassName={DashboardSidebarCss.isActive}
        >
          <MaterialUI.Tooltip title="Create Workspace" placement="right-end">
            <div className={DashboardSidebarCss.workspaceIcon}>
              Create workspace
            </div>
          </MaterialUI.Tooltip>
        </NavLink>

        <NavLink
          to="/profile/search"
          activeClassName={DashboardSidebarCss.isActive}
        >
          <MaterialUI.Tooltip title="Find Workspace" placement="right-end">
            <div className={DashboardSidebarCss.workspaceIcon}>
              Find workspaces
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
      </MaterialUI.Grid>
    </>
  );
}

export default DashboardProfileSidebar;
