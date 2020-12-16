import React from "react";
import * as MaterialUI from "@material-ui/core";
import DashboardSidebarCss from "./DashboardSidebar.module.css";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  NavLink,
<<<<<<< HEAD
=======
  // useHistory,
>>>>>>> 1440eaab9975b2f440c3599cb3df1af9fb1d055c
} from "react-router-dom";
import Link from "@material-ui/core/Link";


function DashboardSidebar(props) {
<<<<<<< HEAD

=======
  //Check if active workspace
  // const [active, setActive] = useState(true);
  // function checkActive() {
  //   if (active === true) {
  //     return DashboardSidebarCss.workspaceIconActive;
  //   }
  // }

  // const history = useHistory();
>>>>>>> 1440eaab9975b2f440c3599cb3df1af9fb1d055c

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

      {/* sidebar2 */}
      {/* <MaterialUI.Grid
        container
        md={2}
        spacing={0}
        alignItems="center"
        justify="space-around"
        direction="column"
        className={`${DashboardSidebarCss.sideBarBorder} ${DashboardSidebarCss.sidebar2Background}`}
      >
        <NavLink
          to="/workspace/chat"
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
      </MaterialUI.Grid> */}
    </>
  );
}

export default DashboardSidebar;
