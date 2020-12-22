import React from "react";
import DashboardProfileUserInfo from "./DashboardProfileUserInfo";
import DashboardProfileUserCalender from "./DashboardProfileUserCalender";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  calendar: {
    backgroundColor: "#F0EFE9",
  },
}));

const DashboardProfileHome = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography align="center" variant="h3" gutterBottom>
              Welcome to Creact, {props.name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <DashboardProfileUserInfo
              userName={props.name}
              userImg={props.userImg}
              userFirstName={props.userFirstName}
              userLastName={props.userLastName}
              userEmail={props.userEmail}
            />
          </Grid>
          <Grid item xs={6} className={classes.calendar}>
            <DashboardProfileUserCalender />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default DashboardProfileHome;
