import {React, useState} from "react";
import * as MaterialUI from "@material-ui/core";
import DashboardSidebarCss from "./DashboardSidebar.module.css";
import {
  NavLink,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
//collab doc
import PostAddIcon from '@material-ui/icons/PostAdd';
//task
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
//whiteboard
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
//video
import VideoCallIcon from '@material-ui/icons/VideoCall';



const DashboardFeatureSidebar = (props) => {
  
  const useStyles = makeStyles((theme) => ({
    avatarHoverIcon:{
      "&:hover": {
        background: '#000',
      },
    },
    avatarActiveIcon:{
      background: '#000'
    },

  }));
  const classes = useStyles();

  // console.log('dashboardfeaturessidebar props.chatroomId', props)
  return (
    <MaterialUI.Grid
      container
      md={1}
      spacing={0}
      alignItems="center"
      justify="space-around"
      direction="column"
      className={` ${DashboardSidebarCss.sidebar2Background}`}
    >
      <div className = {DashboardSidebarCss.topBar}>
      </div>        
        <NavLink
          to={`/workspace/${props.currentWorkspace}/chat?userid=${props.userId}&room=${props.chatroomId}`}
          className={DashboardSidebarCss.featureIconLink}
          
        >
          <MaterialUI.Tooltip title="Chatroom" placement="right-end">
              <Avatar 
              className = {
                // props.location === `/workspace/${props.currentWorkspace}/chat`
                // ? `${classes.avatarActiveIcon}`
                // : `${classes.avatarHoverIcon}`
                `${classes.avatarHoverIcon}`
              }
              >
                <ChatBubbleOutlineIcon />
              </Avatar>
          </MaterialUI.Tooltip>
        </NavLink>

        <NavLink
          to={`/workspace/${props.currentWorkspace}/docs`}
          className={DashboardSidebarCss.featureIconLink}
        >
          <MaterialUI.Tooltip
            title="Collaboration document"
            placement="right-end"
          >
              <Avatar 
              className = {
                // props.location === `/workspace/${props.currentWorkspace}/docs`
                // ? `${classes.avatarActiveIcon}`
                // : `${classes.avatarHoverIcon}`
                `${classes.avatarHoverIcon}`
                }>
                <PostAddIcon />
              </Avatar>
          </MaterialUI.Tooltip>
        </NavLink>

        <NavLink
          to={`/workspace/${props.currentWorkspace}/tasks`}
          className={DashboardSidebarCss.featureIconLink}
        >
          <MaterialUI.Tooltip
            title="Collaboration Task List"
            placement="right-end"
          >
            {/* <div className={DashboardSiavatarIcondebarCss.featureIcon}> */}
              <Avatar className = {`${classes.avatarHoverIcon}`}>
                <FormatListNumberedIcon />
              </Avatar>
            {/* </div> */}
          </MaterialUI.Tooltip>
        </NavLink>

        <NavLink
          to={`/workspace/${props.currentWorkspace}/whiteboard`}
          className={DashboardSidebarCss.featureIconLink}
        >
          <MaterialUI.Tooltip title="Whiteboard" placement="right-end">
            <Avatar className = {`${classes.avatarHoverIcon}`}>
                <DeveloperBoardIcon />
              </Avatar>
          </MaterialUI.Tooltip>
        </NavLink>

        <NavLink
          to={`/workspace/${props.currentWorkspace}/video`}
          className={DashboardSidebarCss.featureIconLink}
        >
          <MaterialUI.Tooltip title="Video" placement="right-end">
            <Avatar className = {`${classes.avatarHoverIcon}`}>
              <VideoCallIcon />
            </Avatar> 
          </MaterialUI.Tooltip>
        </NavLink>
    </MaterialUI.Grid>
  );
};

export default DashboardFeatureSidebar;
