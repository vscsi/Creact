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
    fontWeight: "800",
    margin: 20,
    color: "white",
  },

  /**Card content */
  inputStyle: {
    margin: 30,
    fontSize: '1.3rem',
    color: '#fff',
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

const DashboardProfileUserInfo = (props) => {
  const classes = useStyles();
  return (
    <>
      <Card className={`${classes.root} ${classes.profileBackground}`}>
        {/* <div className={`${classes.profileBackground} `}>
        </div> */}
        <CardMedia className={`${classes.media} `} image={props.userImg} />
        {/* <img src={userPhoto}></img> */}
        <CardContent>
          <Typography align="center" variant="h6" className={classes.nameStyle}>
            {props.userFirstName} {props.userLastName}
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography className={classes.inputStyle}>
          <FaUserAlt className ={classes.iconMargin}/>
            Username: {props.userName}
          </Typography>
          <Typography className={classes.inputStyle}>
            <RiLockPasswordLine className ={classes.iconMargin}/>
            Password: ********
          </Typography>
          <Typography className={classes.inputStyle}>
            <MdEmail className ={classes.iconMargin}/>
            Email: {props.userEmail}
          </Typography>
        </CardContent>
        {/* </div> */}
      </Card>
    </>
  );
};

export default DashboardProfileUserInfo;
