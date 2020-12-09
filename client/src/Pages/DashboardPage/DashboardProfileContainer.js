import React from "react";
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

function DashboardProfileContainer() {
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="stretch"
        className={`${DashboardContainerCss.containerHeight} ${DashboardContainerCss.containerBackground}`}
      >
        <Router>
          <DashboardProfileSidebar />
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
              <Route path="/find" component={DashboardAddSocial} />
              <Route path="/create" component={DashboardCreateWorkspace} />
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
