import React from "react";
import * as MaterialUI from "@material-ui/core";
// import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import DashboardNavbarCss from "./DashboardNavbar.module.css";
import { makeStyles } from "@material-ui/core/styles";
import creactLogo from '../../../images/creactWhite.png';

function DashboardNavbar(props) {
  const styles = makeStyles({
    root: {
      margin: "0.5rem",
    },
  });
  const classes = styles();

  return (
    <>
      <nav className={DashboardNavbarCss.DashboardNav}>
        <img className={DashboardNavbarCss.logoSize} src={creactLogo}></img>
        {/* <div className={DashboardNavbarCss.remindBox}>Remind Box</div> */}

        {/* <div className={DashboardNavbarCss.userIcon}>
          {props.loginUsers.map((item, index) => {
            return (
              <MaterialUI.Avatar key={index} classes={{ root: classes.root }}>
                {item.username[0]}
              </MaterialUI.Avatar>
            );
          })}
        </div> */}
        {/* <div className={DashboardNavbarCss.userIcon}>
          <MaterialUI.Avatar classes={{ root: classes.root }}>
            {props.loginUsers[0].name}
          </MaterialUI.Avatar>
        </div> */}
        {/* {props.loginUsers.map((item, index) => {
          return <span key={index}>{item.username}</span>;
        })} */}
      </nav>
    </>
  );
}

export default DashboardNavbar;