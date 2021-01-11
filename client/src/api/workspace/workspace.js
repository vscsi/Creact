import Axios from "axios";

// const workspace = getCurrentWorkspace();

const get_Workspace_All = (cb) => {
  try {
    // Axios.get("http://localhost:4000/workspace/all", {
      Axios.get(`${process.env.REACT_APP_API_SERVER}/workspace/all`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((res) => cb(res.data));
  } catch (error) {
    console.error(error.message);
  }
};

// const post_Workspace_Info = (cb) => {
//   try {
//     Axios.post(
//       "http://localhost:4000/workspace/check",
//       // `${process.env.REACT_APP_API_SERVER}/workspace/check`,
//       {
//         workspaceName: workspace,
//       },
//       {
//         headers: { "x-access-token": localStorage.getItem("token") },
//       }
//     ).then((res) => {
//       // console.log(`Getting post request in /workspace/check`);
//       // console.log(res);
//     //   setAdmin(res.data.isAdmin);
//     //   setUsers(res.data.allUsers);
//     //   setFirstEmptyUsers(res.data.firstEmptyUsers);
//     //   setCurrentWorkspacePW(res.data.workspacePassword);
//       return cb(res.data);
//     });
//   } catch (error) {
//     console.error(error.message);
//   }
// };

export { get_Workspace_All };
