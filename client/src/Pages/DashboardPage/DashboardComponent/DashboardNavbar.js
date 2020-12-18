import React from "react";
// import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import DashboardNavbarCss from "./DashboardNavbar.module.css";

function DashboardNavbar(props) {
  // const [userName, setUserName] = useState("");
  //overriding Avatar root class


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
