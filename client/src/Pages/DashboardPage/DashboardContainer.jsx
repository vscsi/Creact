import React from "react";
import DashboardContainerCss from "./DashboardContainer.module.css";
import DashboardSidebar from "./DashboardComponent/DashboardSidebar";
import DashboardProfileSidebar from './DashboardComponent/DashboardProfieSidebar';
import DashboardMain from "./DashboardComponent/DashboardMain";
import { Grid } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardNavbar from "./DashboardComponent/DashboardNavbar";
import DashboardMainCss from "./DashboardComponent/DashboardMain.module.css";
import ChatroomContainer from "./DashboardFeatures/ChatroomPage/ChatroomContainer";
import CollabNoteContainer from "./DashboardFeatures/CollaborationNotePage/CollabNoteContainer";
import DropboxContainer from "./DashboardFeatures/DropboxPage/DropboxContainer";
import CollabTaskContainer from "./DashboardFeatures/CollaborationTaskPage/CollabTaskContainer";
import CalenderContainer from "./DashboardFeatures/CalenderPage/CalenderContainer";
import WhiteboardContainer from "./DashboardFeatures/WhiteboardPage/WhiteboardContainer";
import VideoContainer from "./DashboardFeatures/VideoPage/VideoContainer";
import VideoCreateRoom from "./DashboardFeatures/VideoPage/VideoCreateRoom";

function DashboardContainer() {
  return (
    <>
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
            alignItems={"flex-end"}
          >
            <DashboardNavbar />
            <Switch>
              <Route path="/workspace/chat" component={ChatroomContainer} />
              <Route path="/workspace/docs" component={CollabNoteContainer} />
              <Route path="/workspace/dropbox" component={DropboxContainer} />
              <Route path="/workspace/tasks" component={CollabTaskContainer} />
              <Route path="/workspace/calender" component={CalenderContainer} />
              <Route
                path="/workspace/whiteboard"
                component={WhiteboardContainer}
              />
              <Route path="/workspace/video" exact component={VideoCreateRoom} />
              <Route path="/workspace/video/:roomID" exact component={VideoContainer} />
            </Switch>
          </Grid>
        </Router>
      </Grid>
    </>
  );
}

export default DashboardContainer;
