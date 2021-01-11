import React, { useEffect, useState } from "react";
import EventCalendar from "../DashboardFeatures/CalenderPage/component/EventCalendar";
import Axios from "axios";

const DashboardProfileUserCalender = () => {
  const [tasks, setTasks] = useState([]);
  const getUserAllTasks = () => {
    try {
      // Axios.get("http://localhost:4000/task/usertasks", {
      Axios.get(`${process.env.REACT_APP_API_SERVER}/task/usertasks`, {
        headers: { "x-access-token": localStorage.getItem("token") },
      }).then((res) => {
        // console.log(res.data.allTasks);
        setTasks(res.data.allTasksCalender);
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getUserAllTasks();
  }, []);

  return (
    <>
      <EventCalendar 
      
      tasks={tasks} onlyUser={true} onlyWorkspace={false}/>
    </>
  );
};

export default DashboardProfileUserCalender;
