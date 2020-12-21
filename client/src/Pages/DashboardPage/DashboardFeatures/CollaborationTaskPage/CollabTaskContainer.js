import React, { useState, useEffect } from "react";
import CollabTaskBox from "./components/CollabTaskBox";
import CollabTaskList from "./components/CollabTaskList";
// import Pagination from "./components/Pagination";
// import styles from "./CollabTaskContainer.module.css";
import Axios from "axios";
import { getCurrentWorkspace } from "../../../../services/getCurrentWorkspace";
import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const CollabTaskContainer = (props) => {
  const [tasks, setTasks] = useState([]);
  //For Pagination
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [tasksPerPage, setTasksPerPage] = useState(4);

  const classes = useStyles();

  //get all tasks function
  const getTasks = () => {
    try {
      const currentWorkspace = getCurrentWorkspace();
      setLoading(true);
      Axios.post(
        "http://localhost:4000/tasks",
        // `${process.env.REACT_APP_API_SERVER}/tasks`,
        {
          workspaceName: currentWorkspace,
        },
        {
          headers: { "x-access-token": localStorage.getItem("token") },
        }
      ).then((res) => {
        // console.log("get res from '/tasks");
        // console.log(res);
        setTasks(res.data);
        // console.log(jsonData);
      });

      // setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  //Get current task
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //delete task function
  const handleDelete = async (id) => {
    try {
      Axios.delete(`http://localhost:4000/tasks/${id}`, {
      // Axios.delete(`${process.env.REACT_APP_API_SERVER}/tasks/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((res) => {
        // console.log(`delete res from '/tasks/id`);
        // console.log(res);
        setTasks(
          tasks.filter((task, index) => {
            return task.id !== id;
          })
        );
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    // <div className={styles.wrapper}>
    <div className={classes.root}>
      <Grid container spacing={2} m={2}>
        {props.isAdmin && (
          <Grid item xs={6}>
            <CollabTaskBox
              users={props.users}
              firstEmptyUsers={props.firstEmptyUsers}
            />
          </Grid>
        )}
        <Grid item xs={!props.isAdmin ? 12 : 6}>
          <CollabTaskList
            tasks={currentTasks}
            handleDelete={handleDelete}
            tasksPerPage={tasksPerPage}
            totalTasks={tasks.length}
            paginate={paginate}
            currentUser={props.name}
          />
        </Grid>
      </Grid>
    </div>
    // </div>
  );
};

export default CollabTaskContainer;
