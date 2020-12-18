import React, { useState, useEffect } from "react";
import * as MaterialUI from "@material-ui/core";
// import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import DashboardNavbarCss from "./DashboardNavbar.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

function DashboardNavbar(props) {
  // const [userName, setUserName] = useState("");
  //overriding Avatar root class
  const styles = makeStyles({
    root: {
      margin: "0.5rem",
    },
  });
  const classes = styles();
  /////

  return (
    <>
      <nav className={DashboardNavbarCss.DashboardNav}>
        <div className={DashboardNavbarCss.remindBox}>Remind Box</div>

        {/* {props.loginUsers.map((item, index) => {
          <div className={DashboardNavbarCss.userIcon}>
            <MaterialUI.Avatar key={index} classes={{ root: classes.root }}>
              {item.name}
            </MaterialUI.Avatar>
          </div>;
        })} */}
        {/* <div className={DashboardNavbarCss.userIcon}>
          <MaterialUI.Avatar classes={{ root: classes.root }}>
            {props.loginUsers[0].name}
          </MaterialUI.Avatar>
        </div> */}
        {props.loginUsers.map((item, index) => {
          return <span key={index}>{item.name}</span>;
        })}
      </nav>
    </>
  );
}

export default DashboardNavbar;
