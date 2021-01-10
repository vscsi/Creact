import React, { useState, useEffect } from "react";
import DashboardContainerCss from "./DashboardContainer.module.css";
import DashboardProfileSidebar from "./DashboardComponent/DashboardProfieSidebar";
import { Grid } from "@material-ui/core";
import {
  BrowserRouter as Router,
  //eslint-disable-next-line
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import DashboardNavbar from "./DashboardComponent/DashboardNavbar";
// import DashboardAddSocial from "./DashboardComponent/DashboardAddSocial";
import DashboardCreateWorkspace from "./DashboardComponent/DashboardCreateWorkspace";
import DashboardProfileHome from "./DashboardComponent/DashboardProfileHome.js";
// import DashboardFriendSidebar from "./DashboardComponent/DashboardFriendSidebar";
import DashboardSearchWorkspace from "./DashboardComponent/DashboardSearchWorkspace";
// import { getCurrentWorkspace } from "../../services/getCurrentWorkspace";

import { get_User_Info, get_User_Workspaces } from "../../api/user/user.js";

import { get_Workspace_All } from "../../api/workspace/workspace.js";

import { get_User_Logout } from "../../api/logout/logout";

function DashboardProfileContainer() {
  const [userName, setUserName] = useState("");
  // const [userPassword, setUserPassword] = useState("");
  const [userWorkspaces, setUserWorkspaces] = useState([]);
  const [allWorkspaces, setAllWorkspaces] = useState([]);
  const [loginUsers, setLoginUsers] = useState([]);
  const [currClickWorkspace, setCurrClickWorkspace] = useState("");
  const [userImg, setUserImg] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    get_User_Info((data) => {
      // console.log("improved get user info");
      // console.log(data);
      const { userName, userImg, firstName, lastName, email } = data;
      setUserName(userName);
      setUserImg(userImg);
      setUserFirstName(firstName);
      setUserLastName(lastName);
      setUserEmail(email);
    });
    get_User_Workspaces((data) => {
      // console.log("improved get user workspaces");
      // console.log(data);
      const { userWorkspaces } = data;
      setUserWorkspaces(userWorkspaces);
    });
    get_Workspace_All((data) => {
      // console.log("improved get all workspaces");
      // console.log(data);
      setAllWorkspaces(data);
    });
    get_User_Logout((data) => {
      // console.log("improved get user logout");
      // console.log(data);
      const { loginUsers } = data;
      setLoginUsers(loginUsers);
    });
  }, []);

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="stretch"
        className={`${DashboardContainerCss.containerHeight} ${DashboardContainerCss.containerBackground}`}
      >
        <Router>
          <DashboardProfileSidebar
            name={userName}
            workspaces={userWorkspaces}
            currClickWorkspace={currClickWorkspace}
            userImg={userImg}
          />
          <Grid
            Container
            direction="row"
            md={11}
            spacing={0}
            alignItems={"flex-end"}
            className={DashboardContainerCss.gridFeatureMain}
          >
            <DashboardNavbar loginUsers={loginUsers} name={userName} />
            <Route exact path="/profile">
              <DashboardProfileHome
                name={userName}
                userImg={userImg}
                userFirstName={userFirstName}
                userLastName={userLastName}
                userEmail={userEmail}
              />
            </Route>
            <Route
              exact
              path="/profile/create"
              render={() => {
                setCurrClickWorkspace("");
                return <DashboardCreateWorkspace />;
              }}
              // component={DashboardCreateWorkspace}
            />
            <Route exact path="/profile/search">
              <DashboardSearchWorkspace allWorkspaces={allWorkspaces} />
            </Route>
          </Grid>
        </Router>
      </Grid>
    </>
  );
}

export default DashboardProfileContainer;
