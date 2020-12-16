import React from 'react'
import * as MaterialUI from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import DashboardNavbarCss from './DashboardNavbar.module.css'
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';

function DashboardNavbar() {
  //overriding Avatar root class
  const styles =makeStyles(
    {
      root: {
        margin:'0.5rem'
      }
    }
  );
  const classes = styles();
  /////
  return (
    <>
       <nav className={DashboardNavbarCss.DashboardNav}>
        
        <div className ={DashboardNavbarCss.remindBox}>
          Remind Box
        </div>

        <div className ={DashboardNavbarCss.userIcon}>
          {/* <MaterialUI.Avatar 
            classes={{root: classes.root}}>
          <PermIdentityIcon color='action'/>
          </MaterialUI.Avatar>

          <MaterialUI.Avatar
            classes={{root: classes.root}}>
          <PermIdentityIcon color ='primary'/>
          </MaterialUI.Avatar>

          <MaterialUI.Avatar
            classes={{root: classes.root}}>
          <PermIdentityIcon color ='secondary'/>
          </MaterialUI.Avatar>
           */}
        </div>
       
      </nav>
    </>
  )
}

export default DashboardNavbar;
