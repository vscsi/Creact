import React, { useState } from "react";
import styles from "./CollabTaskList.module.css";

const CollabTaskListItem = (props) => {
  function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }

  return (
    <div className={styles.task}>
      <div className={styles.task_box}>
        <h3>Task: </h3>
        <p>{props.task.task_name}</p>
      </div>
      <div className={styles.task_box}>
        <h3>Responsible: </h3>
        <p>{props.task.userName}</p>
      </div>
      <div className={styles.task_box}>
        <h3>Deadline: </h3>
        <p>{parseISOString(props.task.deadline).toString()}</p>
      </div>
      <div className={styles.task_box}>
        <h3>Description: </h3>
        <p>{props.task.task_content}</p>
      </div>
      {props.currentUser === props.task.userName && (
        <div className={styles.task_box}>
          <input
            type="button"
            value="Finish Task"
            onClick={() => {
              props.handleDelete(props.id);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CollabTaskListItem;
