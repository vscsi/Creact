import React from "react";
// import styles from "./CollabTaskList.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: theme.spacing(1),
  },
  section2: {
    margin: theme.spacing(2),
  },
  // section3: {
  //   margin: theme.spacing(3)
  // }
}));

export default function CollabTaskListItem(props) {
  const classes = useStyles();

  function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.task.userName[0]}
          </Avatar>
        }
        title={`Responsible: ${props.task.userName}`}
      />
      <CardContent>
        <div className={classes.section2}>
          <Typography gutterBottom variant="h5" component="h2">
            Task:
          </Typography>
          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom
          >
            {props.task.task_name}
          </Typography>
        </div>
        <Divider variant="middle" />
        <div className={classes.section2}>
          <Typography gutterBottom variant="h5" component="h2">
            Deadline:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {parseISOString(props.task.deadline).toString()}
            <br />
          </Typography>
        </div>

        <Divider variant="middle" />
        <div className={classes.section2}>
          <Typography gutterBottom variant="h5" component="h2">
            Description:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.task.task_content}
            <br />
          </Typography>
        </div>
      </CardContent>
      {props.currentUser === props.task.userName && (
        <CardActions>
          <div className={classes.section2}>
            <Button
              startIcon={<DeleteIcon />}
              size="small"
              color="secondary"
              className={classes.button}
              variant="contained"
              onClick={() => {
                props.handleDelete(props.id);
              }}
            >
              Finish Task
            </Button>
          </div>
        </CardActions>
      )}
    </Card>
  );
}

// const CollabTaskListItem = (props) => {
//   function parseISOString(s) {
//     var b = s.split(/\D+/);
//     return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
//   }

//   return (
//     <div className={styles.task}>
//       <div className={styles.task_box}>
//         <h3>Task: </h3>
//         <p>{props.task.task_name}</p>
//       </div>
//       <div className={styles.task_box}>
//         <h3>Responsible: </h3>
//         <p>{props.task.userName}</p>
//       </div>
//       <div className={styles.task_box}>
//         <h3>Deadline: </h3>
//         <p>{parseISOString(props.task.deadline).toString()}</p>
//       </div>
//       <div className={styles.task_box}>
//         <h3>Description: </h3>
//         <p>{props.task.task_content}</p>
//       </div>
//       {props.currentUser === props.task.userName && (
//         <div className={styles.task_box}>
//           <input
//             type="button"
//             value="Finish Task"
//             onClick={() => {
//               props.handleDelete(props.id);
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CollabTaskListItem;
