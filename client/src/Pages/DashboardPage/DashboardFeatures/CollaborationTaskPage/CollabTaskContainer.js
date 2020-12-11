import React, { useState, useEffect } from "react";
import CollabTaskBox from "./components/CollabTaskBox";
import CollabTaskList from "./components/CollabTaskList";
// import Pagination from "./components/Pagination";
import styles from "./CollabTaskContainer.module.css";

const CollabTaskContainer = () => {
  const [tasks, setTasks] = useState([]);
  //For Pagination
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(4);

  console.log(loading, setTasksPerPage)
  //get all tasks function
  const getTasks = async () => {
    try {
      setLoading(true);
      // const response = await fetch("http://localhost:4000/workspace/tasks");
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}:4000/workspace/tasks`);
      const jsonData = await response.json();
      setTasks(jsonData);
      setLoading(false);
      console.log(jsonData);
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
      // const deleteTask = await fetch(`http://localhost:4000/tasks/${id}`, {
      const deleteTask = await fetch(`${process.env.REACT_APP_API_SERVER}/tasks/${id}`, {
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
