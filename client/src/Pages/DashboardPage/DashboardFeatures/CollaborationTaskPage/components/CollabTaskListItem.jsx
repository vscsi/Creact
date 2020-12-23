import React from "react";
// import styles from "./CollabTaskList.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
//eslint-disable-next-line
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import moduleClasses from "./CollabTaskListItem.module.css";
// import Moment from 'react-moment';

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

  //eslint-disable-next-line
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
            {/* {parseISOString(props.task.deadline)
              .toString()
              .toLocaleString("zh-HK", { timeZone: "UTC" })} */}
            {/* {parseISOString(props.task.deadline).toString()} */}
            {/* <Moment locale="zh">{props.task.deadline}</Moment> */}
            {props.task.deadline}
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
        // <CardActions>
        <div className={moduleClasses.FinishDiv}>
          <div className={classes.section2}>
            <Button
              // className={moduleClasses.FinishButton}
              startIcon={<DeleteIcon />}
              size="small"
              color="secondary"
              className={`${classes.button} ${moduleClasses.FinishButton}`}
              variant="contained"
              onClick={() => {
                props.handleDelete(props.id);
              }}
            >
              Finish Task
            </Button>
          </div>
        </div>
        // </CardActions>
      )}
    </Card>
  );
}
