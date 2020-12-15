import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";
import DashboardMainCss from "./DashboardMain.module.css";
import DashboardNavbar from "./DashboardNavbar";
// import DashboardAddSocial from "./DashboardAddSocial";
import DashboardCreateWorkspace from "./DashboardCreateWorkspace";

function DashboardProfileMain() {
  return (
    <>
      <Grid
        container
        direction="row"
        md={9}
        spacing={0}
        className={`${DashboardMainCss.testGreen}`}
        alignItems={"flex-start"}
      >
        <DashboardNavbar />
        {/* <DashboardAddSocial /> */}
        <DashboardCreateWorkspace />
      </Grid>
    </>
  );
}

export default DashboardProfileMain;
