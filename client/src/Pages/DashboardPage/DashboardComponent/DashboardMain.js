import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";
import DashboardMainCss from "./DashboardMain.module.css";
import DashboardNavbar from "./DashboardNavbar";

function DashboardMain() {
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
        <Router>
          <Switch></Switch>
        </Router>
      </Grid>
    </>
  );
}

export default DashboardMain;
