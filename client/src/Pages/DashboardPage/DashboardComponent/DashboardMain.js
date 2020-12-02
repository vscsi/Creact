import React from "react";
import { Grid, Paper } from "@material-ui/core";
import DashboardMainCss from "./DashboardMain.module.css";
import DashboardNavbar from "./DashboardNavbar";
import Aux from "../../../hoc/Auxiliary";
import CollabTaskContainer from "../DashboardFeatures/CollaborationTaskPage/CollabTaskContainer";
import CollaborationNoteContainer from "../DashboardFeatures/CollaborationNotePage/CollaborationNoteContainer";
import CalenderContainer from "../DashboardFeatures/CalenderPage/CalenderContainer";
import ChatroomContainer from "../DashboardFeatures/ChatroomPage/ChatroomContainer";
import DropboxContainer from "../DashboardFeatures/DropboxPage/DropboxContainer";
import VideoContainer from "../DashboardFeatures/VideoPage/VideoContainer";
import WhiteboardContainer from "../DashboardFeatures/WhiteboardPage/WhiteboardContainer";
import DashboardDummy from "./DashboardDummy";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function DashboardMain() {
  return (
    <Aux>
      <Grid
        Container
        direction="row"
        md={9}
        spacing={0}
        className={`${DashboardMainCss.testGreen}`}
        alignItems={"flex-end"}
      >
        <DashboardNavbar />
      </Grid>
    </Aux>
  );
}

export default DashboardMain;
