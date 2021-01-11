import React, { useState } from "react";
//eslint-disable-next-line
import styles from "./DashboardSearchWorkspace.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { Grid } from "@material-ui/core";
  //eslint-disable-next-line
import { Card, Divider } from "@material-ui/core";

//eslint-disable-next-line
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import PeopleIcon from "@material-ui/icons/People";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: "#212429",
    color: "#f0efe9",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  item: {
    color: "#f0efe9",
    margin: "auto",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const DashboardSearchWorkspace = (props) => {
  const [open, setOpen] = useState(false);
  const [workspacePassword, setWorkSpacePassword] = useState("");
  const [currWP, setCurrWP] = useState("");
  const [modalStyle] = useState(getModalStyle);

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    let config = {
      headers: { "x-access-token": `${localStorage.getItem("token")}` },
    };
    try {
      Axios.post(
        // "http://localhost:4000/workspace/checkpw",
        `${process.env.REACT_APP_API_SERVER}/workspace/create`,
        {
          workspaceName: currWP,
          workspacePassword: workspacePassword,
        },
        config
      ).then((res) => {
        console.log(`check pw res in browser`);
        console.log(res);
        if (res.data.wp_password) {
          handleJoin(currWP);
        } else {
          alert("Your password is wrong");
        }
      });
      // window.location = "/profile";
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleJoin = (workspaceName) => {
    try {
      Axios.post(
        // "http://localhost:4000/workspace/join",
        `${process.env.REACT_APP_API_SERVER}/workspace/join`,
        {
          workspaceName: workspaceName,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      ).then((res) => {
        // console.log(`Res from /workspace/join`);
        // console.log(res);
        //need to redirect back to the new workspace page
        window.location = `/workspace/${workspaceName}`;
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
     <div className={styles.AddMargin}>
      <Grid container spacing={3}>
        <Grid  item xs={12}>
          <h1 >Search Workspace</h1>
        </Grid>
        {props.allWorkspaces.map((item, index) => {
          return (
            <Grid item xs={4} key={index}>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={`https://source.unsplash.com/collection/${index}`}
                  title="Paella dish"
                />
                <CardContent>
                  <Typography variant="subtitle1" align="center">
                    {item.workspace_name}
                  </Typography>
                  {/* <p>Maximum User: {item.max_user}</p> */}
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton className={classes.item}>
                    <PeopleIcon />
                    <Typography>{item.numOfUsers} users</Typography>
                  </IconButton>
                </CardActions>
                <CardActions disableSpacing>
                  <IconButton
                    className={classes.item}
                    onClick={() => {
                      setOpen(true);
                      setCurrWP(item.workspace_name);
                      //if password is correct, then can join the workspace
                      //if not, will say password is incorrect

                      // handleJoin(item.workspace_name);
                    }}
                  >
                    <AddIcon />
                    <Typography>Join</Typography>
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Card>
          <div style={modalStyle} className={classes.paper}>
            <form method="post" onSubmit={onSubmitForm}>
              <label htmlFor="workspace_password">Please input password</label>
              <input
                className={classes.MaxPeopleInput}
                type="password"
                name="workspace_password"
                id=""
                required
                minlength="8"
                onChange={(e) => setWorkSpacePassword(e.target.value)}
              />
              <input type="submit" value="Enter" />
            </form>
          </div>
        </Card>
      </Modal>
      </div>
    </>
  );
};

export default DashboardSearchWorkspace;
