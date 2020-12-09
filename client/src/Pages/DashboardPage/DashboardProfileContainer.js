import React, { useState, useEffect } from "react";
import DashboardContainerCss from "./DashboardContainer.module.css";
import DashboardSidebar from "./DashboardComponent/DashboardSidebar";
import DashboardProfileSidebar from "./DashboardComponent/DashboardProfieSidebar";
import DashboardMain from "./DashboardComponent/DashboardMain";
import { Grid } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardNavbar from "./DashboardComponent/DashboardNavbar";
import DashboardMainCss from "./DashboardComponent/DashboardMain.module.css";
import DashboardAddSocial from "./DashboardComponent/DashboardAddSocial";
import DashboardCreateWorkspace from "./DashboardComponent/DashboardCreateWorkspace";
import DashboardProfileHome from "./DashboardComponent/DashboardProfileHome.js";
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

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
    getAllWorkspace();
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
          {/* <DashboardSidebar /> */}
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
            {/* <DashboardAddSocial /> */}
            {/* <DashboardCreateWorkspace /> */}
          </Grid>
        </Router>
      </Grid>
    </>
  );
}

export default DashboardProfileContainer;
