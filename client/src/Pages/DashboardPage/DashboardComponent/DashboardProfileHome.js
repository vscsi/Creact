import React from "react";
import DashboardProfileUserInfo from "./DashboardProfileUserInfo";
import DashboardProfileUserCalender from "./DashboardProfileUserCalender";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const DashboardProfileHome = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1>Welcome to Creact, {props.name}</h1>
          </Grid>
          <Grid item xs={6}>
            <DashboardProfileUserInfo />
          </Grid>
          <Grid item xs={6}>
            <DashboardProfileUserCalender />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default DashboardProfileHome;
