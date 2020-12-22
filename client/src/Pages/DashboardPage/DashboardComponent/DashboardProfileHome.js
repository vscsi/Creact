import React from "react";
import DashboardProfileUserInfo from "./DashboardProfileUserInfo";
import DashboardProfileUserCalender from "./DashboardProfileUserCalender";
import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { 
  Typography,
  Card,
  Avatar
 } from "@material-ui/core";
 import firework from '../../../images/firework.png'

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

  fireworkIcon:{
    height: '8rem',
    width: '8rem ',
  },

  /**welcome title */
  welcomeContainer: {
    margin: '3% 0 3% 15%'
  },
  
  usernameTitle: {
    margin: '8% 0 0 15%',
    fontSize: '5vw',
    fontWeight: '800',
    letterSpacing: '0.2vw'
  },
  
  welcomeTitle: {
    margin: '0 0 5% 15%',
    letterSpacing: '0.2vw'
  },

  /**calendar */
  calendar: {
    backgroundColor: '#F0EFE9',
    marginLeft: '10%',
  },
  calendarTitle:{
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
                src={firework}
                className = {classes.fireworkMargin}
                >
              </Avatar>
            </Grid>
            <Grid 
            Item
            xs={6}
            >
              <Typography 
              className = {classes.usernameTitle}
              align="start" variant="h3">{props.name},</Typography>
              <br />
              <Typography 
              className = {classes.welcomeTitle}
              align="start" variant="h3" gutterBottom >Welcome to Creact! </Typography>
            </Grid>
          </Grid>
          
          {/* <Grid item xs ={3}>
            <Typography>Here's what you can do in Creact:</Typography>
            <Grid Container>
              <Paper>
                <Avatar className ={classes.avatarSize} >
                  <Filter1Icon />
                </Avatar>
              </Paper>
              <Paper>
                <Avatar className ={classes.avatarSize} >
                  <Filter2Icon />
                </Avatar>
              </Paper>
              <Paper>
                <Avatar className ={classes.avatarSize} >
                  <Filter3Icon />
                </Avatar>
              </Paper>
            </Grid>
          </Grid> */}
          <Grid container item xs={12} md={3} 
            justify = "center"
          >
            <Typography variant="h4" className={classes.profileTitle}>Your profile:</Typography>
            <DashboardProfileUserInfo />
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
