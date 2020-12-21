import React, { useState, useEffect } from "react";
import DashboardContainerCss from "./DashboardContainer.module.css";
import DashboardProfileSidebar from "./DashboardComponent/DashboardProfieSidebar";
import { Grid } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Route,
  // Redirect,
} from "react-router-dom";
import DashboardNavbar from "./DashboardComponent/DashboardNavbar";
// import DashboardAddSocial from "./DashboardComponent/DashboardAddSocial";
import DashboardCreateWorkspace from "./DashboardComponent/DashboardCreateWorkspace";
import DashboardProfileHome from "./DashboardComponent/DashboardProfileHome.js";
// import DashboardFriendSidebar from "./DashboardComponent/DashboardFriendSidebar";
import Axios from "axios";
import DashboardSearchWorkspace from "./DashboardComponent/DashboardSearchWorkspace";
// import { getCurrentWorkspace } from "../../services/getCurrentWorkspace";

function DashboardProfileContainer() {
  const [userName, setUserName] = useState("");
  const [userWorkspaces, setUserWorkspaces] = useState([]);
  const [allWorkspaces, setAllWorkspaces] = useState([]);
  const [loginUsers, setLoginUsers] = useState([]);
  const [currClickWorkspace, setCurrClickWorkspace] = useState("");

  const getUserWorkspaces = () => {
    try {
      Axios.get("http://localhost:4000/workspace/list", {
      // Axios.get(`${process.env.REACT_APP_API_SERVER}/workspace/list`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((res) => {
        // console.log(`all user workspaces`);
        // console.log(res);
        // console.log(res.data.allWorkspaces);
        setUserWorkspaces(res.data.userWorkspaces);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUserName = () => {
    try {
      Axios.get("http://localhost:4000/username", {
      // Axios.get(`${process.env.REACT_APP_API_SERVER}/username`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((res) => {
        // console.log(`res from /username`);
        // console.log(res.data.userName);
        setUserName(res.data.userName);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const getAllWorkspaces = () => {
    try {
      Axios.get("http://localhost:4000/workspace/all", {
      // Axios.get(`${process.env.REACT_APP_API_SERVER}/workspace/all`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((res) => {
        // console.log(`res from workspace/all`);
        // console.log(res);
        setAllWorkspaces(res.data);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const postLogout = () => {
    try {
      Axios.get("http://localhost:4000/checkloginusers", {
      // Axios.get(`${process.env.REACT_APP_API_SERVER}/checkloginusers`, {
        headers: { "x-access-token": localStorage.getItem("token") },
      }).then((res) => {
        // console.log("Current login users from '/checkloginusers'");
        // console.log(res.data.loginUsers);
        const currentLoginUsers = res.data.loginUsers;
        // console.log(currentLoginUsers);
        setLoginUsers(currentLoginUsers);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserWorkspaces();
    getUserName();
    getAllWorkspaces();
    postLogout(); 
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
              <DashboardProfileHome name={userName} />
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
