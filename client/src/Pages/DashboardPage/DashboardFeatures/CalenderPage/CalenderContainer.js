import React, { useState, useEffect } from "react";
import EventCalendar from "./component/EventCalendar";
import { getTasks } from "../../../../api/task/task";

function CalenderContainer() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getTasks((res) => {
      console.log("using improved way to show res");
      console.log(res);
      let allTasks = [];
      for (let item of res) {
        allTasks.push({
          title: item.task_name,
          date: item.deadline,
          content: item.task_content,
          responsible: item.userName,
        });
      }
      setTasks(allTasks);
    });
  }, []);
  return (
    <>
      <EventCalendar tasks={tasks} />
    </>
  );
}

export default CalenderContainer;
