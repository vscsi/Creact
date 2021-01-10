import React, { useState, useEffect } from "react";
import EventCalendar from "./component/EventCalendar";
import { get_Workspace_Tasks } from "../../../../api/task/task";

function CalenderContainer() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    get_Workspace_Tasks((res) => {
      console.log("using improved way to show res");
      console.log(res);
      setTasks(res);
    });
  }, []);
  return (
    <>
      <EventCalendar tasks={tasks} onlyUser={false} onlyWorkspace={true}/>
    </>
  );
}
 
export default CalenderContainer;
