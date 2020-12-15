import React, { useState } from "react";
import styles from "./CollabTaskBox.module.css";
import Axios from "axios";
import { getCurrentWorkspace } from "../../../../../services/getCurrentWorkspace";

const CollabTaskBox = (props) => {
  const [taskName, setTaskName] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskUser, setTaskUser] = useState(0);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const currentWorkspace = getCurrentWorkspace();
      const body = {
        taskName,
        taskContent,
        taskDeadline,
        taskUser,
        currentWorkspace
      };
      console.log("Form is submtted");
      console.log(body);
      // const response = await Axios.post("http://localhost:4000/task", body, {
      const response = await Axios.post(`${process.env.REACT_APP_API_SERVER}/task`, body, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      console.log(response);
      window.location = `/workspace/${currentWorkspace}/tasks`;
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
              onChange={(e) => {
                console.log(e.target.value);
                setTaskUser(parseInt(e.target.value))
              }}
            >
              {props.users.map((item, index) => {
                return (
                  //value should be user.id
                  <option key={item.user_id} value={item.user_id}>
                    {item.user_name}
                  </option>
                );
              })}
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
