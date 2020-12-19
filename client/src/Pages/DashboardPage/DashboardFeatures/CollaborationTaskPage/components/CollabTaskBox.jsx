import React, { useState } from "react";
// import styles from "./CollabTaskBox.module.css";
import Axios from "axios";
import { getCurrentWorkspace } from "../../../../../services/getCurrentWorkspace";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import Icon from "@material-ui/core/Icon";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textField: {
    width: "25ch",
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
}));

const CollabTaskBox = (props) => {
  const [taskName, setTaskName] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskUser, setTaskUser] = useState(0);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const currentWorkspace = getCurrentWorkspace();
      const body = {
        taskName,
        taskContent,
        taskDeadline,
        taskUser,
        currentWorkspace,
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Card className={classes.root} variant="outlined">
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={onSubmitForm}
      >
        <CardContent>
          <FormControl className={classes.formControl}>
            <TextField
              required
              id="standard-required"
              label="Task Name"
              defaultValue="Task"
              onChange={(e) => setTaskName(e.target.value)}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="datetime-local"
              label="Task Deadline"
              type="datetime-local"
              required
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setTaskDeadline(e.target.value)}
            />
          </FormControl>

          <FormControl className={classes.formControl}>
            {/* <InputLabel htmlFor="input-with-icon-adornment">
              Description
            </InputLabel> */}
            <TextField
              id="standard-multiline-flexible"
              label="Description"
              // className={classes.textField}
              multiline
              rowsMax={4}
              value={taskContent}
              onChange={(e) => setTaskContent(e.target.value)}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">
              Assign to:
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              onChange={(e) => {
                console.log(e.target.value);
                setTaskUser(parseInt(e.target.value));
              }}
            >
              {props.firstEmptyUsers.map((item, index) => {
                return (
                  //value should be user.id
                  <MenuItem key={item.user_id} value={item.user_id}>
                    {item.user_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </CardContent>

        <CardActions>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
            >
              Send
            </Button>
          </FormControl>
        </CardActions>
      </form>
    </Card>
  );
};

export default CollabTaskBox;
