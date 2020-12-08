import React from "react";
import styles from "../../DashboardPage/DashboardFeatures/CollaborationTaskPage/components/CollabTaskBox.module.css";

const DashboardCreateWorkspace = () => {
  return (
    <>
      <div className={styles.box_wrapper}>
        <div className={styles.box}>
          <form method="post">
            <div className={styles.box_input}>
              <label htmlFor="workspace_name">Workspace Name:</label>
              <input type="text" name="workspace_name" id="" required />
            </div>
          </form>
          <div className={styles.box_input}>
            <input type="submit" value="Finish" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCreateWorkspace;
