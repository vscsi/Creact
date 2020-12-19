import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CollabTaskListItem from "./CollabTaskListItem";
// import styles from "./CollabTaskList.module.css";
import Pagination from "./Pagination";
// import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const CollabTaskList = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Task Lists</h1>
      <Grid container spacing={2}>
        {props.tasks.map((task) => {
          return (
            <Grid item xs={6}>
              <CollabTaskListItem
                key={task.id}
                id={task.id}
                handleDelete={props.handleDelete}
                task={task}
                currentUser={props.currentUser}
              />
            </Grid>
          );
        })}
      </Grid>
      <Pagination
        tasksPerPage={props.tasksPerPage}
        totalTasks={props.totalTasks}
        paginate={props.paginate}
      />
    </div>
  );
};

// const CollabTaskList = (props) => {

//   return (
//     <div className={styles.box}>
//       <h1>Task Lists</h1>
//       <div className={styles.tasks}>
//         {props.tasks.map((task) => {
//           return (
//             <CollabTaskListItem
//               key={task.id}
//               id={task.id}
//               handleDelete={props.handleDelete}
//               task={task}
//               currentUser={props.currentUser}
//             />
//           );
//         })}
//       </div>
//       <Pagination
//         tasksPerPage={props.tasksPerPage}
//         totalTasks={props.totalTasks}
//         paginate={props.paginate}
//       />
//     </div>
//   );
// };

export default CollabTaskList;
