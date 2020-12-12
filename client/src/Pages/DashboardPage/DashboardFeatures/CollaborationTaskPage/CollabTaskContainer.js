import React, { useState, useEffect } from "react";
import CollabTaskBox from "./components/CollabTaskBox";
import CollabTaskList from "./components/CollabTaskList";
import Pagination from "./components/Pagination";
import styles from "./CollabTaskContainer.module.css";
import Axios from "axios";

const CollabTaskContainer = (props) => {
  const [tasks, setTasks] = useState([]);
  //For Pagination
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(4);
  const [currentWorkspace, setCurrentWorkspace] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserId, setCurrentUserId] = useState(0);

  //get all tasks function
  const getTasks = async () => {
    try {
      setLoading(true);
      Axios.get("/http://localhost:4000/tasks", {
        headers: { "x-access-token": localStorage.getItem("token") },
      }).then((res) => {
        console.log("get res from '/tasks");
        console.log(res);
        // setTasks(jsonData);
        // console.log(jsonData);
      });

      // setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const checkIfAdmin = () => {
    try {
      //1. send post request to server, query to "user_workspace" table
      Axios.post(
        "http://localhost:4000/task/checkadmin",
        {
          userId: currentUserId,
          workspaceName: currentWorkspace,
        },
        {
          headers: { "x-access-token": localStorage.getItem("token") },
        }
      ).then((res) => {
        console.log(`Getting post request in client`);
        console.log(res);
      });
      //2. check if that user is the workspace_admin, return the workspace_admin boolean
      //3. if yes, that user can have the right to assign task, and can see the create task UI
      //4. if no, that user can only see all the tasklists in that workspace
    } catch (error) {
      console.error(error.message);
    }
  };

  // useEffect(() => {
  //   let ignore = false;
  //   getTasks();
  //   if (!ignore) {
  //     setCurrentWorkspace(props.currentWorkspace);
  //     setCurrentUser(props.currentUser);
  //     setCurrentUserId(props.currentUserId);
  //   }
  //   checkIfAdmin();
  //   return () => {
  //     ignore = true;
  //   };
  // }, []);

  //Get current task
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //delete task function
  const handleDelete = async (id) => {
    try {
      const deleteTask = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
      });
      console.log(deleteTask);
      setTasks(
        tasks.filter((task, index) => {
          return task.id !== id;
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <CollabTaskBox />
      <CollabTaskList
        tasks={currentTasks}
        handleDelete={handleDelete}
        tasksPerPage={tasksPerPage}
        totalTasks={tasks.length}
        paginate={paginate}
      />
    </div>
  );
};

export default CollabTaskContainer;
