import React from "react";
import DashboardContainerCss from "./DashboardContainer.module.css";
import DashboardSidebar from "./DashboardComponent/DashboardSidebar";
import DashboardMain from "./DashboardComponent/DashboardMain";
import { Grid } from "@material-ui/core";
import Aux from "../../hoc/Auxiliary";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardNavbar from "./DashboardComponent/DashboardNavbar";
import DashboardMainCss from "./DashboardComponent/DashboardMain.module.css";
import ChatroomContainer from "./DashboardFeatures/ChatroomPage/ChatroomContainer";
import CollaborationNoteContainer from "./DashboardFeatures/CollaborationNotePage/CollaborationNoteContainer";
import DropboxContainer from "./DashboardFeatures/DropboxPage/DropboxContainer";
import CollabTaskContainer from "./DashboardFeatures/CollaborationTaskPage/CollabTaskContainer";
import CalenderContainer from "./DashboardFeatures/CalenderPage/CalenderContainer";
import WhiteboardContainer from "./DashboardFeatures/WhiteboardPage/WhiteboardContainer";
import VideoContainer from "./DashboardFeatures/VideoPage/VideoContainer";

function DashboardContainer() {
  return (
    <Aux>
      <Grid
        container
        direction="row"
        alignItems="stretch"
        className={`${DashboardContainerCss.containerHeight} ${DashboardContainerCss.containerBackground}`}
      >
        <Router>
          <DashboardSidebar />
          <Grid
            Container
            direction="row"
            md={9}
            spacing={0}
            className={`${DashboardMainCss.testGreen}`}
            alignItems={"flex-end"}
          >
            <DashboardNavbar />
            <Switch>
              <Route path="/workspace/chatroom" component={ChatroomContainer} />
              <Route
                path="/workspace/documents"
                component={CollaborationNoteContainer}
              />
              <Route path="/workspace/dropbox" component={DropboxContainer} />
              <Route path="/workspace/tasks" component={CollabTaskContainer} />
              <Route path="/workspace/calender" component={CalenderContainer} />
              <Route
                path="/workspace/whiteboard"
                component={WhiteboardContainer}
              />
              <Route path="/workspace/video" exact component={VideoContainer} />
            </Switch>
          </Grid>
        </Router>
      </Grid>
    </Aux>
  );
}

export default DashboardContainer;
