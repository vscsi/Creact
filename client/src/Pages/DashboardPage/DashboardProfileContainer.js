import React, { useState, useEffect } from "react";
import DashboardContainerCss from "./DashboardContainer.module.css";
import DashboardProfileSidebar from "./DashboardComponent/DashboardProfieSidebar";
import { Grid } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import DashboardNavbar from "./DashboardComponent/DashboardNavbar";
// import DashboardAddSocial from "./DashboardComponent/DashboardAddSocial";
import DashboardCreateWorkspace from "./DashboardComponent/DashboardCreateWorkspace";
import DashboardProfileHome from "./DashboardComponent/DashboardProfileHome.js";
import DashboardFriendSidebar from "./DashboardComponent/DashboardFriendSidebar";
import Axios from "axios";
import DashboardSearchWorkspace from "./DashboardComponent/DashboardSearchWorkspace";

function DashboardProfileContainer() {
  const [userName, setUserName] = useState("");
  const [userWorkspaces, setUserWorkspaces] = useState([]);
  const [allWorkspaces, setAllWorkspaces] = useState([]);

  const getUserWorkspaces = () => {
    try {
      // Axios.get("http://localhost:4000/workspace/list", {
      Axios.get(`${process.env.REACT_APP_API_SERVER}/workspace/list`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((res) => {
        console.log(`all workspaces`);
        console.log(res);
        // console.log(res.data.allWorkspaces);
        setUserWorkspaces(res.data.userWorkspaces);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUserName = () => {
    try {
      // Axios.get("http://localhost:4000/username", {
      Axios.get(`${process.env.REACT_APP_API_SERVER}/username`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((res) => {
        setUserName(res.data.userName);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const getAllWorkspaces = () => {
    try {
      // Axios.get("http://localhost:4000/workspace/all", {
      Axios.get(`${process.env.REACT_APP_API_SERVER}/workspace/all`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((res) => {
        console.log(`res from workspace/all`);
        console.log(res);
        setAllWorkspaces(res.data);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserWorkspaces();
    getUserName();
    getAllWorkspaces();
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
          />
          <DashboardFriendSidebar />
          <Grid
            Container
            direction="row"
            md={9}
            spacing={0}
            alignItems={"flex-end"}
          >
            <DashboardNavbar />
            <Switch>
              <Route exact path="/profile" component={DashboardProfileHome} />
              {/* <Route path="/profile/find" component={DashboardAddSocial} /> */}
              <Route
                path="/profile/create"
                component={DashboardCreateWorkspace}
              />
              <Route path="/profile/search">
                <DashboardSearchWorkspace allWorkspaces={allWorkspaces} />
              </Route>
            </Switch>
          </Grid>
        </Router>
      </Grid>
    </>
  );
}

export default DashboardProfileContainer;
