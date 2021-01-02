import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, Divider, Typography } from "@material-ui/core";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import userPhoto from "../../../images/tomcruise.jpg";
// import blurBackground from "../../../images/blurbackground.jpg";
// import { RiLockPasswordLine } from "react-icons/ri";

const useStyles = makeStyles({});

const DashboardWorkspaceHome = (props) => {
  const classes = useStyles();
  return (
    <>
      <Card>
        {/* <div className={`${classes.profileBackground} `}>
        </div> */}
        {/* <img src={userPhoto}></img> */}
        <CardContent>
          <Typography className={classes.inputStyle}>
            WorkspaceName: {props.currentWorkspace}
          </Typography>
          {props.isAdmin && (
            <Typography className={classes.inputStyle}>
              WorkspacePassword: {props.currentWorkspacePW}
            </Typography>
          )}
          <Typography className={classes.inputStyle}>Members:</Typography>
          <ul>
            {props.users.map((item) => {
              return <li>{item.user_name}</li>;
            })}
          </ul>
        </CardContent>
        {/* </div> */}
      </Card>
    </>
  );
};

export default DashboardWorkspaceHome;
