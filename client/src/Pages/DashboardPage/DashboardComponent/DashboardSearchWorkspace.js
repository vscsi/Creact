import React, { useEffect, useState } from "react";
import styles from "./DashboardSearchWorkspace.module.css";
import Axios from "axios";

const DashboardSearchWorkspace = (props) => {
  const handleJoin = (workspaceName) => {
    try {
      Axios.post(
        "http://localhost:4000/workspace/join",
        {
          workspaceName: workspaceName,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      ).then((res) => {
        console.log(`Res from /workspace/join`);
        console.log(res);
        //need to redirect back to the new workspace page
        window.location = `/workspace/${workspaceName}`;
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <h1>Search Workspace</h1>
      <div className={styles.workspaceList}>
        {props.allWorkspaces.map((item, index) => {
          return (
            <div key={index} className={styles.eachWorkspace}>
              <ol>
                <li value={index + 1}>
                  <p>{item.workspace_name}</p>
                  <p>Maximum User: {item.max_user}</p>
                  <p>Current Users: {item.numOfUsers}</p>
                  <button
                    onClick={() => {
                      handleJoin(item.workspace_name);
                    }}
                  >
                    Join
                  </button>
                </li>
              </ol>
            </div>
          );
        })}
        <p>{props.isAdmin}</p>
      </div>
    </>
  );
};

export default DashboardSearchWorkspace;
