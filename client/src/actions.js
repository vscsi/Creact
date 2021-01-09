import {
  REQUEST_USER_WORKSPACES_PENDING,
  REQUEST_USER_WORKSPACES_SUCCESS,
  REQUEST_USER_WORKSPACES_FAILED,
} from "./constants.js";

import Axios from "axios";

export const requestUserWorkspaces = () => (dispatch) => {
  dispatch({ type: REQUEST_USER_WORKSPACES_PENDING });
  Axios.get("http://localhost:4000/workspace/list", {
    // Axios.get(`${process.env.REACT_APP_API_SERVER}/workspace/list`, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((res) => {
      // console.log(`all workspaces`);
      // console.log(res);
      // console.log("this is userworkspaceSS", res.data.allWorkspaces);
      dispatch({
        type: REQUEST_USER_WORKSPACES_SUCCESS,
        payload: res.data.userWorkspaces,
      });
    })
    .catch((error) =>
      dispatch({ type: REQUEST_USER_WORKSPACES_FAILED, payload: error })
    );
};
