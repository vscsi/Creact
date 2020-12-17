import React, { useState, useEffect } from "react";
import * as MaterialUI from '@material-ui/core';
// import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import DashboardNavbarCss from "./DashboardNavbar.module.css";
import { makeStyles } from '@material-ui/core/styles';

function DashboardNavbar() {
  const [userName, setUserName] = useState("");
  //overriding Avatar root class
  const styles = makeStyles({
    root: {
      margin: "0.5rem",
    },
  });
  const classes = styles();
  /////
  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
  }, []);
  return (
    <>
      <nav className={DashboardNavbarCss.DashboardNav}>
        <div className={DashboardNavbarCss.remindBox}>Remind Box</div>

        <div className={DashboardNavbarCss.userIcon}>
          <MaterialUI.Avatar classes={{ root: classes.root }}>
            {userName[0]}
          </MaterialUI.Avatar>
        </div>
      </nav>
    </>
  );
}

export default DashboardNavbar;
