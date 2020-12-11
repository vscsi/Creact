import React, { useState } from "react";
import styles from "../../DashboardPage/DashboardFeatures/CollaborationTaskPage/components/CollabTaskBox.module.css";
import Axios from "axios";

const DashboardCreateWorkspace = () => {
  const [workspaceName, setWorkSpaceName] = useState("");
  const [maxppl, setMaxppl] = useState(0);
  const onSubmitForm = (e) => {
    e.preventDefault();
    let config = {
      headers: { "x-access-token": `${localStorage.getItem("token")}` },
    };
    try {
      Axios.post(
        // "http://localhost:4000/workspace/create",
        `${process.env.REACT_APP_API_SERVER}/workspace/create`,
        {
          workspaceName: workspaceName,
          maxppl: maxppl,
        },
        config
      ).then((res) => {
        console.log(res);
      });
      window.location = "/profile";
      
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <div className={styles.box_wrapper}>
        <div className={styles.box}>
          <form method="post" onSubmit={onSubmitForm}>
            <div className={styles.box_input}>
              <label htmlFor="workspace_name">Workspace Name:</label>
              <input
                type="text"
                name="workspace_name"
                id=""
                required
                onChange={(e) => {
                  setWorkSpaceName(e.target.value);
                }}
              />
            </div>
            <div className={styles.box_input}>
              <label htmlFor="workspace_ppl_max">People Max: </label>
              <input
                type="number"
                name="workspace_ppl_max"
                id=""
                required
                min="2"
                max="20"
                onChange={(e) => setMaxppl(e.target.value)}
              />
            </div>
            <div className={styles.box_input}>
              <input type="submit" value="Create" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DashboardCreateWorkspace;
