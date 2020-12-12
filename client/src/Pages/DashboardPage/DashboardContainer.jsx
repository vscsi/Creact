import React, { useState, useEffect } from "react";
import DashboardContainerCss from "./DashboardContainer.module.css";
import { Grid } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import DashboardNavbar from "./DashboardComponent/DashboardNavbar";
import ChatroomContainer from "./DashboardFeatures/ChatroomPage/ChatroomContainer";
import CollabNoteContainer from "./DashboardFeatures/CollaborationNotePage/CollabNoteContainer";
import DropboxContainer from "./DashboardFeatures/DropboxPage/DropboxContainer";
import CollabTaskContainer from "./DashboardFeatures/CollaborationTaskPage/CollabTaskContainer";
import CalenderContainer from "./DashboardFeatures/CalenderPage/CalenderContainer";
import WhiteboardContainer from "./DashboardFeatures/WhiteboardPage/WhiteboardContainer";
// import VideoContainer from "./DashboardFeatures/VideoPage/VideoContainer";
import DashboardAddSocial from "./DashboardComponent/DashboardAddSocial";
import DashboardCreateWorkspace from "./DashboardComponent/DashboardCreateWorkspace";
import DashboardProfileHome from "./DashboardComponent/DashboardProfileHome.js";
import DashboardFeatureSidebar from "./DashboardComponent/DashboardFeatureSidebar";
import DashboardProfileSidebar from "./DashboardComponent/DashboardProfieSidebar";
import Axios from "axios";
import VideoConferenceRoom from "./DashboardFeatures/VideoPage/VideoConferenceRoom";
import VideoCreateRoom from "./DashboardFeatures/VideoPage/VideoCreateRoom";

function DashboardContainer() {
  const [userName, setUserName] = useState("");
  const [workspaces, setWorkspaces] = useState([]);
  const [currentWorkspace, setCurrentWorkspace] = useState("");
  const { name } = useParams();

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

  const getCurrentWorkspace = () => {
    const path = window.location.pathname;
    // console.log(`url is below`);
    // console.log(path);
    const currWorkspace = path.split("/workspace/")[1];
    // console.log(currWorkspace);
    setCurrentWorkspace(currWorkspace);
  };


  useEffect(() => {
    getAllWorkspace();
    getUserName();
    getCurrentWorkspace();
    // console.log(currentWorkspace);
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
          <DashboardFeatureSidebar currentWorkspace={currentWorkspace} />
          <Grid
            Container
            direction="row"
            md={9}
            spacing={0}
            alignItems={"flex-end"}
          >
            <DashboardNavbar />
            <Switch>
              {/* for profile route */}
              <Route exact path="/profile" component={DashboardProfileHome} />
              <Route path="/profile/find" component={DashboardAddSocial} />
              <Route
                path="/profile/create"
                component={DashboardCreateWorkspace}
              />
              {/* for workspace route */}
              <Route
                path={`/workspace/:${currentWorkspace}/chat`}
                component={ChatroomContainer}
              />
              <Route path={`/workspace/:${currentWorkspace}/docs`} component={CollabNoteContainer} />
              <Route path={`/workspace/:${currentWorkspace}/dropbox`} component={DropboxContainer} />
              <Route path={`/workspace/:${currentWorkspace}/tasks`} component={CollabTaskContainer} />
              <Route
                path={`/workspace/:${currentWorkspace}/calender`}
                component={CalenderContainer}
              />
              <Route
                path={`/workspace/:${currentWorkspace}/whiteboard`}
                component={WhiteboardContainer}
              />
              <Route
                    path={`/workspace/:${currentWorkspace}/video`}
                    render={(props)=><VideoCreateRoom {...props} userName={userName} workspaces={workspaces} currentWorkspace={currentWorkspace}/>}
                    exact
                />
                    <Route
                        path={`/workspace/:${currentWorkspace}/video/:roomId`}
                        exact
                        component={VideoConferenceRoom}
                    />
            </Switch>
          </Grid>
        </Router>
      </Grid>
    </>
  );
}

export default DashboardContainer;
