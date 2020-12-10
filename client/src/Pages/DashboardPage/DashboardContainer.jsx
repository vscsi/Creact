import React, { useState, useEffect } from "react";
import DashboardContainerCss from "./DashboardContainer.module.css";
import { Grid } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardNavbar from "./DashboardComponent/DashboardNavbar";
import ChatroomContainer from "./DashboardFeatures/ChatroomPage/ChatroomContainer";
import CollabNoteContainer from "./DashboardFeatures/CollaborationNotePage/CollabNoteContainer";
import DropboxContainer from "./DashboardFeatures/DropboxPage/DropboxContainer";
import CollabTaskContainer from "./DashboardFeatures/CollaborationTaskPage/CollabTaskContainer";
import CalenderContainer from "./DashboardFeatures/CalenderPage/CalenderContainer";
import WhiteboardContainer from "./DashboardFeatures/WhiteboardPage/WhiteboardContainer";
import VideoContainer from "./DashboardFeatures/VideoPage/VideoContainer";
import VideoCreateRoom from "./DashboardFeatures/VideoPage/VideoCreateRoom";
import DashboardAddSocial from "./DashboardComponent/DashboardAddSocial";
import DashboardCreateWorkspace from "./DashboardComponent/DashboardCreateWorkspace";
import DashboardProfileHome from "./DashboardComponent/DashboardProfileHome.js";
import DashboardFeatureSidebar from "./DashboardComponent/DashboardFeatureSidebar";
import DashboardProfileSidebar from "./DashboardComponent/DashboardProfieSidebar";
import Axios from "axios";

function DashboardContainer() {
  const [userName, setUserName] = useState("");
  const [workspaces, setWorkspaces] = useState([]);

  const getAllWorkspace = () => {
    try {
      Axios.get("http://localhost:4000/workspace/list", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((res) => {
        setWorkspaces(res.data.allWorkspaces);
        // console.log(res);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUserName = () => {
    try {
      Axios.get("http://localhost:4000/username", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((res) => {
        setUserName(res.data.userName);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllWorkspace();
    getUserName();
  }, []);
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="stretch"
        className={`${DashboardContainerCss.containerHeight} ${DashboardContainerCss.containerBackground}`}
      >
        <Router>
          <DashboardProfileSidebar name={userName} workspaces={workspaces} />
          <DashboardFeatureSidebar />
          <Grid
            Container
            direction="row"
            md={9}
            spacing={0}
            alignItems={"flex-end"}
          >
            <DashboardNavbar />
            <Switch>
              <Route exact path="/profile" component={DashboardProfileHome} />
              <Route path="/profile/find" component={DashboardAddSocial} />
              <Route
                path="/profile/create"
                component={DashboardCreateWorkspace}
              />
              <Route path="/workspace/chat" component={ChatroomContainer} />
              <Route path="/workspace/docs" component={CollabNoteContainer} />
              <Route path="/workspace/dropbox" component={DropboxContainer} />
              <Route path="/workspace/tasks" component={CollabTaskContainer} />
              <Route
                path="/workspace/calenthder"
                component={CalenderContainer}
              />
              <Route
                path="/workspace/whiteboard"
                component={WhiteboardContainer}
              />
              <Route
                path="/workspace/video"
                exact
                component={VideoCreateRoom}
              />
              <Route
                path="/workspace/video/:roomID"
                exact
                component={VideoContainer}
              />
            </Switch>
          </Grid>
        </Router>
      </Grid>
    </>
  );
}

export default DashboardContainer;
