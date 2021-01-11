  //eslint-disable-next-line
import {React, useEffect} from "react";
import DashboardProfileUserInfo from "./DashboardProfileUserInfo";
import DashboardProfileUserCalender from "./DashboardProfileUserCalender";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { 
  Typography,
  //eslint-disable-next-line
  Card,
  Avatar
 } from "@material-ui/core";
 import creactLogo from '../../../images/creactBlack.png'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '1005',
    margin: '0 0 5vh -3vh',
  },
  /**firework icon */
  fireworkMargin: {
    margin: '10% 10%',
    height:'12rem',
    width:'12rem',
  },

  logoMargin:{
    height: '10rem',
    width: '10rem ',
    margin: '30% 0 0 0'
  },

  /**welcome title */
  welcomeContainer: {
    margin: '3% 0 3% 12%'
  },
  
  usernameTitle: {
    margin: '8% 0 0 12%',
    fontSize: '3vw',
    fontWeight: '600',
    letterSpacing: '0.2vw',
    color: '#000',
  },
  
  welcomeTitle: {
    margin: '0 0 5% 12%',
    letterSpacing: '0.2vw',
    fontSize: '2vw',
    color: '#000',
  },

  /**calendar */
  calendar: {
    backgroundColor: '#F0EFE9',
    marginLeft: '10%',
  },
  calendarTitle:{
    color:'#000',
    margin: '1vh 0 0 0',
  },

  /**profile */
  profileTitle: {
    margin: '0 0 2vh 0'
  },
  
  avatarSize:{
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const DashboardProfileHome = (props) => {
  // useEffect(()=>{
  //   console.log(props)
  // },[])
  const classes = useStyles();
  return (
    <>
      <div>
        <Grid container
        className= {classes.root}
        direction='row'
        justify='center'
        >
          <Grid 
          container
          item 
          xs={12}
          className = {classes.welcomeContainer}
          >
            <Grid 
            Item>
              <Avatar
                src={creactLogo}
                className = {classes.logoMargin}
                >
              </Avatar>
            </Grid>
            <Grid 
            Item
            xs={6}
            >
              <Typography 
              className = {classes.usernameTitle}
              align="start">{props.name},</Typography>
              <br />
              <Typography 
              className = {classes.welcomeTitle}
              align="start" gutterBottom >Welcome to Creact! </Typography>
            </Grid>
          </Grid>
          
          <Grid container item xs={12} md={3} 
            justify = "center"
          >
            <DashboardProfileUserInfo
              userName={props.name}
              userImg={props.userImg}
              userFirstName={props.userFirstName}
              userLastName={props.userLastName}
              userEmail={props.userEmail}
            />
           </Grid>
          <Grid item xs={12} md={6} className={classes.calendar}>
            <Typography variant="h4" className={classes.calendarTitle}>Your tasks:</Typography>

            <DashboardProfileUserCalender />
           </Grid>
        </Grid>
      </div>
    </>
  );
};

export default DashboardProfileHome;
