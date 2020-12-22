import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, Divider, Typography } from "@material-ui/core";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import userPhoto from "../../../images/tomcruise.jpg";
import blurBackground from "../../../images/blurbackground.jpg";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    width: 150,
    margin: "auto",
    marginTop: 20,
    borderRadius: "50%",
    borderColor: "white",
    borderWidth: "solid",
    backgroundColor: "black",
  },
  nameStyle: {
    fontWeight: "bold",
    margin: 20,
    // color: "white",
  },
  inputStyle: {
    margin: 20,
  },
  profileBackground: {
    backgroundImage: `${blurBackground}`,
  },
});

const DashboardProfileUserInfo = (props) => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root}>
        {/* <div style={{ backgroundImage: `${blurBackground}` }}> */}
        <CardMedia className={classes.media} image={props.userImg} />
        {/* <img src={userPhoto}></img> */}
        <CardContent>
          <Typography align="center" variant="h6" className={classes.nameStyle}>
            {props.userFirstName} {props.userLastName}
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography className={classes.inputStyle}>
            Username: {props.userName}
          </Typography>
          <Typography className={classes.inputStyle}>
            Password: ********
          </Typography>
          <Typography className={classes.inputStyle}>
            Email: {props.userEmail}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardProfileUserInfo;
