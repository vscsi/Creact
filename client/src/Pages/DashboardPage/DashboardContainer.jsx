import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import DashboardContainerCss from "./DashboardContainer.module.css";
import DashboardSidebarCss from "../DashboardPage/DashboardComponent/DashboardSidebar.module.css";
import { Grid } from "@material-ui/core";
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  // useParams,
} from "react-router-dom";
import DashboardNavbar from "./DashboardComponent/DashboardNavbar";
import ChatroomContainer from "./DashboardFeatures/ChatroomPage/ChatroomContainer";
import CollabNoteContainer from "./DashboardFeatures/CollaborationNotePage/CollabNoteContainer";
import DropboxContainer from "./DashboardFeatures/DropboxPage/DropboxContainer";
import CollabTaskContainer from "./DashboardFeatures/CollaborationTaskPage/CollabTaskContainer";
import CalenderContainer from "./DashboardFeatures/CalenderPage/CalenderContainer";
import WhiteboardContainer from "./DashboardFeatures/WhiteboardPage/WhiteboardContainer";
// import DashboardAddSocial from "./DashboardComponent/DashboardAddSocial";
import DashboardCreateWorkspace from "./DashboardComponent/DashboardCreateWorkspace";
import DashboardProfileHome from "./DashboardComponent/DashboardProfileHome.js";
import DashboardFeatureSidebar from "./DashboardComponent/DashboardFeatureSidebar";
import DashboardProfileSidebar from "./DashboardComponent/DashboardProfieSidebar";
import DashboardSearchWorkspace from "./DashboardComponent/DashboardSearchWorkspace";
import DashboardWorkspaceHome from "./DashboardComponent/DashboardWorkspaceHome";
import Axios from "axios";
import VideoContainer from "./DashboardFeatures/VideoPage/VideoContainer";

// import { getCurrentWorkspace } from "../../services/getCurrentWorkspace";

import {
  get_Workspace_All,
  post_Workspace_Info,
} from "../../api/workspace/workspace";

import { get_User_Logout } from "../../api/logout/logout";

import { requestUserWorkspaces, requestUserInfo } from "../../actions.js";

const mapStateToProps = (state) => {
  return {
    userWorkspaces: state.requestUserWorkspaces.userWorkspaces,
    isPending: state.requestUserWorkspaces.isPending,
    error: state.requestUserWorkspaces.error,
    userId: state.requestUserInfo.userId,
    userName: state.requestUserInfo.userName,
    userImg: state.requestUserInfo.userImg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserWorkspaces: () => dispatch(requestUserWorkspaces()),
    getUserInfo: () => dispatch(requestUserInfo()),
  };
};

function DashboardContainer(props) {
  // const [userName, setUserName] = useState("");
  // const [userWorkspaces, setUserWorkspaces] = useState([]);
  const [currentWorkspace, setCurrentWorkspace] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [firstEmptyUsers, setFirstEmptyUsers] = useState([]);
  const [allWorkspaces, setAllWorkspaces] = useState([]);
  const [chatroomId, setChatroomId] = useState("");
  // const [userId, setUserId] = useState("");
  const [loginUsers, setLoginUsers] = useState([]);
  // const [currClickWorkspace, setCurrClickWorkspace] = useState("");
  const location = window.location.pathname;
  // const [userImg, setUserImg] = useState("");
  const [currentWorkspacePW, setCurrentWorkspacePW] = useState("");

  const chatroomInit = (workspace) => {
    // console.log("chatroomInit receive", workspace);
    try {
      Axios.post(
        "http://localhost:4000/workspace/chatroominit",
        // Axios.post(`${process.env.REACT_APP_API_SERVER}/workspace/chatroominit`,
        {
          workspaceName: workspace,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      ).then((res) => {
        // console.log("chatroominit", res);
        // console.log("chatroom Id", res.data);
        setChatroomId(res.data);
      });
    } catch (error) {}
  };

  const getCurrentWorkspace = () => {
    const path = window.location.pathname;
    // console.log(`url is below`);
    // console.log(path);
    // eslint-disable-next-line
    const regex = /\/workspace\/([^\/]+)/;
    const result = path.match(regex);
    // console.log(`currworkspace url is below`);
    // console.log(result);
    const currWorkspace = result[1];
    // console.log("currWorkspace value", currWorkspace);
    chatroomInit(currWorkspace);
    setCurrentWorkspace(currWorkspace);
    //send post request to server and check if user is admin
    checkIfAdminUsers(currWorkspace);
  };

  const checkIfAdminUsers = (workspace) => {
    try {
      //1. send post request to server, query to "user_workspace" table
      Axios.post(
        "http://localhost:4000/workspace/check",
        // `${process.env.REACT_APP_API_SERVER}/workspace/check`,
        {
          workspaceName: workspace,
        },
        {
          headers: { "x-access-token": localStorage.getItem("token") },
        }
      ).then((res) => {
        // console.log(`Getting post request in /workspace/check`);
        // console.log(res);
        setAdmin(res.data.isAdmin);
        setUsers(res.data.allUsers);
        setFirstEmptyUsers(res.data.firstEmptyUsers);
        setCurrentWorkspacePW(res.data.workspacePassword);
      });
      //2. check if that user is the workspace_admin, return the workspace_admin boolean
      //3. if yes, that user can have the right to assign task, and can see the create task UI
      //4. if no, that user can only see all the tasklists in that workspace
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    //using redux
    props.getUserWorkspaces();
    props.getUserInfo();

    getCurrentWorkspace();

    get_Workspace_All((data) => {
      // console.log(`improved way get all workspaces`);
      // console.log(data);
      setAllWorkspaces(data);
    });

    get_User_Logout((data) => {
      // console.log(`improved way get user logout`);
      // console.log(data);
      const { loginUsers } = data;
      setLoginUsers(loginUsers);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { userWorkspaces, userId, userName, userImg } = props;
  return (
    <>
      {/* Grid1 */}
      <Grid
        container
        direction="row"
        alignItems="stretch"
        // wrap="nowrap"
        className={`${DashboardContainerCss.containerHeight} ${DashboardContainerCss.containerBackground}`}
      >
        <Router>
          {/* Grid2 */}
          <DashboardProfileSidebar
            name={userName}
            workspaces={userWorkspaces}
            currClickWorkspace={currentWorkspace}
            userImg={userImg}
          />
          {/* Grid 3 */}
          <Grid
            Container
            item
            direction="column"
            md={11}
            spacing={0}
            alignItems="flex-end"
            className={DashboardContainerCss.gridFeatureMain}
          >
            {/* Grid 4 */}
            <Grid item xs={12}>
              <DashboardNavbar loginUsers={loginUsers} userName={userName} />
            </Grid>

            {/* Grid 5 */}
            <Grid
              container
              item
              xs={12}
              className={DashboardContainerCss.gridFeatureMain}
            >
              {/* Grid 6 */}
              <Grid
                container
                item
                md={2}
                spacing={0}
                alignItems="center"
                justify="space-around"
                direction="column"
                className={`${DashboardContainerCss.gridFeatureMain}`}
              >
                {/* <div className = {DashboardSidebarCss.sidebarHeight}> */}
                {currentWorkspace !== "" && (
                  <DashboardFeatureSidebar
                    currentWorkspace={currentWorkspace}
                    userId={userId}
                    chatroomId={chatroomId}
                    location={location}
                  />
                )}
                {/* </div> */}
              </Grid>

              {/* Grid 7 */}
              <Grid item xs={10}>
                {/* <Switch> */}
                {/* for profile route */}
                <Route
                  exact
                  path="/profile"
                  render={() => {
                    return <DashboardProfileHome />;
                  }}
                />
                {/* <Route path="/profile/find" component={DashboardAddSocial} /> */}
                <Route
                  path="/profile/create"
                  render={() => {
                    setCurrentWorkspace("");
                    return <DashboardCreateWorkspace />;
                  }}
                  // component={DashboardCreateWorkspace}
                />
                <Route
                  path="/profile/search"
                  render={() => {
                    setCurrentWorkspace("");
                    return (
                      <DashboardSearchWorkspace allWorkspaces={allWorkspaces} />
                    );
                  }}
                />
                {/* </Route> */}
                {/* for workspace route */}
                <Route
                  exact
                  path={`/workspace/:${currentWorkspace}`}
                  render={() => {
                    return (
                      <DashboardWorkspaceHome
                        isAdmin={isAdmin}
                        currentWorkspace={currentWorkspace}
                        currentWorkspacePW={currentWorkspacePW}
                        users={users}
                      />
                    );
                  }}
                />
                <Route
                  path={`/workspace/:${currentWorkspace}/chat`}
                  // render ={()=>{
                  //   <ChatroomContainer/>
                  // }}
                  component={ChatroomContainer}
                />
                <Route
                  path={`/workspace/:${currentWorkspace}/docs`}
                  component={CollabNoteContainer}
                />
                <Route
                  path={`/workspace/:${currentWorkspace}/dropbox`}
                  component={DropboxContainer}
                />
                <Route
                  path={`/workspace/:${currentWorkspace}/tasks`}
                  render={(props) => (
                    <CollabTaskContainer
                      {...props}
                      isAdmin={isAdmin}
                      users={users}
                      name={userName}
                      firstEmptyUsers={firstEmptyUsers}
                    />
                  )}
                ></Route>
                <Route
                  path={`/workspace/:${currentWorkspace}/calender`}
                  component={CalenderContainer}
                />
                <Route
                  path={`/workspace/:${currentWorkspace}/whiteboard`}
                  component={WhiteboardContainer}
                />
                <VideoContainer
                  currentWorkspace={currentWorkspace}
                  userName={userName}
                />
                {/* </Switch> */}
              </Grid>
            </Grid>
          </Grid>
        </Router>
      </Grid>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
