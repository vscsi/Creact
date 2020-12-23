import React, { useState } from "react";
import Axios from "axios";
import classes from "./DashboardCreateWorkspace.module.css"

const DashboardCreateWorkspace = () => {
  const [workspaceName, setWorkSpaceName] = useState("");
  const [maxppl, setMaxppl] = useState(0);
  //eslint-disable-next-line
  const [enterPage, setEnterPage] = useState(false);
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
        // console.log(res);
      });
      window.location = "/profile";
      
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div >
        <div className={classes.WsTitle}>
          <h1 className={classes.WsTitleH1}>
            Create a Workspace
          </h1>
        </div>

        <div>
          <form method="post" onSubmit={onSubmitForm}>

            <div className={classes.WsName}>
              <label htmlFor="workspace_name">Workspace Name</label>
              <input
                className={classes.WsNameInput}
                type="text"
                name="workspace_name"
                id=""
                required
                onChange={(e) => {
                  setWorkSpaceName(e.target.value);
                }}
              />
            </div>

            <div className={classes.MaxPeople}>
              <label htmlFor="workspace_ppl_max">Maximum people</label>
              <input
                            className={classes.MaxPeopleInput}
                type="number"
                name="workspace_ppl_max"
                id=""
                required
                min="2"
                max="20"
                onChange={(e) => setMaxppl(e.target.value)}
              />
            </div>

            <div className={classes.ButtonContainer}>
              <input 
                hidden type="submit" value="Create" />
              <button className={classes.CreateButton}> Create </button>
            </div>

          </form>
        </div>

        <div className={classes.CreateGuide}>
          <div>
            <p> 1 𐄁 pick a name for your workspace</p>
          </div>
          <div>
            <p> 2 𐄁 select how many people are allowed in your workspace (Max:20)</p>
          </div>
          <div>
            <p> 3 𐄁 click create!</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default DashboardCreateWorkspace;
