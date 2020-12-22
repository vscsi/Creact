import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, Divider, Typography } from "@material-ui/core";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import userPhoto from "../../../images/tomcruise.jpg";
import blurBackground from "../../../images/blurbackground.jpg";
import {FaUserAlt} from 'react-icons/fa';
import {RiLockPasswordLine} from 'react-icons/ri';
import {MdEmail} from 'react-icons/md';

const useStyles = makeStyles({
  root: {
    maxWidth:'100%',
    borderRadius: '10%',
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    marginTop: '10%',
    width: 150,
    borderRadius: "50%",
    borderColor: "#048A81",
    border: "0.2rem solid",
    backgroundColor: "black",
  },
  nameStyle: {
    fontWeight: "bold",
    margin: 20,
    color: "white",
  },

  /**Card content */
  inputStyle: {
    margin: 30,
  },

  iconMargin:{
    margin: '0 0.5vw 0 0 ',
  },

  profileBackground: {
    background: `no-repeat url(${blurBackground})`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const DashboardProfileUserInfo = () => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root}>
        <div className = {`${classes.profileBackground}`}>
        <CardMedia 
          className={`${classes.media}`} 
          image={userPhoto}
          />
        {/* <img src={userPhoto}></img> */}
        <CardContent>
          <Typography align="center" variant="h4" className={classes.nameStyle}>
            Handome Guy
          </Typography>
        </CardContent>
        <Divider />
        </div>
        <CardContent>
          <Typography className={classes.inputStyle}>
          <FaUserAlt className ={classes.iconMargin}/>
          Username: handsome
          </Typography>
          <Typography className={classes.inputStyle}>
            <RiLockPasswordLine className ={classes.iconMargin}/>
            Password: ********
          </Typography>
          <Typography className={classes.inputStyle}>
            <MdEmail className ={classes.iconMargin}/>
            Email: handsome@gmail.com
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardProfileUserInfo;
