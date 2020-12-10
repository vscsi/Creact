import React, { useState } from "react";
import styles from "./CollabTaskBox.module.css";

const CollabTaskBox = (props) => {
  const [taskName, setTaskName] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskUser, setTaskUser] = useState("1");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        taskName,
        taskContent,
        taskDeadline,
        taskUser,
      };
      console.log("Form is submtted");
      console.log(body);
      const response = await fetch("http://localhost:4000/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      window.location = '/workspace/tasks';
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className={styles.box_wrapper}>
      <div className={styles.box}>
        <form method="post" onSubmit={onSubmitForm}>
          <div className={styles.box_input}>
            <label htmlFor="task_name">Task:</label>
            <input
              type="text"
              name="task_name"
              id=""
              required
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className={styles.box_input}>
            <label htmlFor="task_deadline">Deadline:</label>
            <input
              type="datetime-local"
              name="task_deadline"
              id=""
              required
              onChange={(e) => setTaskDeadline(e.target.value)}
            />
          </div>
          <div className={styles.box_input}>
            <label htmlFor="task_description">Description: </label>
            <textarea
              name="task_description"
              id=""
              cols="30"
              rows="10"
              maxLength="999"
              required
              onChange={(e) => setTaskContent(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.box_input}>
            <label htmlFor="task_user">Assign to:</label>
            <select
              name="task_user"
              id=""
              onChange={(e) => setTaskUser(e.target.value)}
            >
              <option value="1">Martin</option>
              <option value="2">Winnie</option>
              <option value="3">Venus</option>
              <option value="4">Charles</option>
            </select>
          </div>
          <div className={styles.box_input}>
            <input type="submit" value="Finish" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollabTaskBox;
