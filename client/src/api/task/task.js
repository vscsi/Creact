import { getCurrentWorkspace } from "../../services/getCurrentWorkspace";
import Axios from "axios";

const get_Workspace_Tasks = (cb) => {
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
      // console.log("get res from '/tasks");
      // console.log(res);
      let allTasks = [];
      for (let item of res.data.allTasksCalender) {
        allTasks.push({
          title: item.task_name,
          date: item.deadline,
          content: item.task_content,
          responsible: item.userName,
        });
      }
      return cb(allTasks);
    });
  } catch (error) {
    console.error(error.message);
  }
};

export { get_Workspace_Tasks };
