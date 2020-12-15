import React, { useState, useEffect } from "react";
import EventCalendar from "./component/EventCalendar";
import { getTasks } from "../../../../api/task/task";

function CalenderContainer() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getTasks((res)=>{
      setTasks(res)
    });
  }, []);
  return <EventCalendar tasks={tasks}/>;
}

export default CalenderContainer;
