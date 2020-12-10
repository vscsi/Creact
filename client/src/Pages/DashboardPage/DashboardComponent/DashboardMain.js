import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import DashboardMainCss from "./DashboardMain.module.css";
import DashboardNavbar from "./DashboardNavbar";
import VideoContainer from "../DashboardFeatures/VideoPage/VideoContainer";
import VideoCreateRoom from "../DashboardFeatures/VideoPage/VideoCreateRoom";
import ChatroomContainer from "../DashboardFeatures/ChatroomPage/ChatroomContainer";
import DropboxContainer from "../DashboardFeatures/DropboxPage/DropboxContainer";
import CalendarContainer from "../DashboardFeatures/CalenderPage/CalenderContainer";
import WhiteboardContainer from "../DashboardFeatures/WhiteboardPage/WhiteboardContainer";
import CollabNoteContainer from "../DashboardFeatures/CollaborationNotePage/CollabNoteContainer";
import CollabTaskContainer from "../DashboardFeatures/CollaborationTaskPage/CollabTaskContainer";

function DashboardMain() {
  return (
    <>
      <Grid
        container
        direction="row"
        md={9}
        spacing={0}
        className={`${DashboardMainCss.testGreen}`}
        alignItems={"flex-start"}
      >
        <DashboardNavbar />
        <Router>
          <Switch></Switch>
        </Router>
      </Grid>
    </>
  );
}

export default DashboardMain;
