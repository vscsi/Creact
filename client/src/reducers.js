import {
  REQUEST_USER_WORKSPACES_PENDING,
  REQUEST_USER_WORKSPACES_SUCCESS,
  REQUEST_USER_WORKSPACES_FAILED,
} from "./constants.js";

const initialStateUser = {
  userWorkspaces: [],
  isPending: false,
  error: "",
};

export const requestUserWorkspaces = (
  state = initialStateUser,
  action = {}
) => {
  switch (action.type) {
    case REQUEST_USER_WORKSPACES_PENDING:
      return { ...state, isPending: true };
    case REQUEST_USER_WORKSPACES_SUCCESS:
      return { ...state, userWorkspaces: action.payload, isPending: false };
    case REQUEST_USER_WORKSPACES_FAILED:
      return { ...state, error: action.payload, isPending: false };
    default:
      return state;
  }
};
