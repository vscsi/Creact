import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, Divider, Typography } from "@material-ui/core";
//eslint-disable-next-line
import CardActionArea from "@material-ui/core/CardActionArea";
//eslint-disable-next-line
import CardActions from "@material-ui/core/CardActions";
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

const DashboardProfileUserInfo = () => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root}>
        {/* <div style={{ backgroundImage: `${blurBackground}` }}> */}
        <CardMedia className={classes.media} image={userPhoto} />
        {/* <img src={userPhoto}></img> */}
        <CardContent>
          <Typography align="center" variant="h6" className={classes.nameStyle}>
            Handome Guy
          </Typography>
        </CardContent>
        <Divider />
        {/* </div> */}
        <CardContent>
          <Typography className={classes.inputStyle}>
            Username: handsome
          </Typography>
          <Typography className={classes.inputStyle}>
            Password: ********
          </Typography>
          <Typography className={classes.inputStyle}>
            Email: handsome@gmail.com
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardProfileUserInfo;
