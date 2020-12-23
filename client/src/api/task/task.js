import { getCurrentWorkspace } from "../../services/getCurrentWorkspace";
import Axios from "axios";

const getTasks = (cb) => {
  try {
    const currentWorkspace = getCurrentWorkspace();
    Axios.post(
      // "http://localhost:4000/tasks",
      `${process.env.REACT_APP_API_SERVER}/tasks`,
      {
        workspaceName: currentWorkspace,
      },
      {
        headers: { "x-access-token": localStorage.getItem("token") },
      }
    ).then((res) => {
      console.log("get res from '/tasks");
      // console.log(res);

      return cb(res.data);
    });
  } catch (error) {
    console.error(error.message);
  }
};

export { getTasks };
