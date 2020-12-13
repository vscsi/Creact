import React, { useState, useEffect } from "react";
import DashboardContainerCss from "./DashboardContainer.module.css";
import DashboardProfileSidebar from "./DashboardComponent/DashboardProfieSidebar";
import { Grid } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import DashboardNavbar from "./DashboardComponent/DashboardNavbar";
import DashboardAddSocial from "./DashboardComponent/DashboardAddSocial";
import DashboardCreateWorkspace from "./DashboardComponent/DashboardCreateWorkspace";
import DashboardProfileHome from "./DashboardComponent/DashboardProfileHome.js";
import DashboardFriendSidebar from "./DashboardComponent/DashboardFriendSidebar";
import Axios from "axios";

function DashboardProfileContainer() {
  const [userName, setUserName] = useState("");
  const [workspaces, setWorkspaces] = useState([]);

  const getAllWorkspace = () => {
    try {
      Axios.get("http://localhost:4000/workspace/list", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((res) => {
        setWorkspaces(res.data.allWorkspaces);
        // console.log(res);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUserName = () => {
    try {
      Axios.get("http://localhost:4000/username", {
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
  

  useEffect(() => {
    getAllWorkspace();
    getUserName();
    console.log(`userName = ${userName}`);
    console.log(`workspaces = ${workspaces}`);
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
          <DashboardProfileSidebar name={userName} workspaces={workspaces} />
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
              <Route path="/profile/find" component={DashboardAddSocial} />
              <Route
                path="/profile/create"
                component={DashboardCreateWorkspace}
              />
            </Switch>
          </Grid>
        </Router>
      </Grid>
    </>
  );
}

export default DashboardProfileContainer;
