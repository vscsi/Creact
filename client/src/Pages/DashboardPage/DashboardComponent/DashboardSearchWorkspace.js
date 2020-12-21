import React from "react";
//eslint-disable-next-line
import styles from "./DashboardSearchWorkspace.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
//eslint-disable-next-line
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import PeopleIcon from "@material-ui/icons/People";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

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
    margin: 'auto'
  },
}));

const DashboardSearchWorkspace = (props) => {
  const classes = useStyles();

  const handleJoin = (workspaceName) => {
    try {
      Axios.post(
        "http://localhost:4000/workspace/join",
        // `${process.env.REACT_APP_API_SERVER}/workspace/join`,
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Search Workspace</h1>
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
                      handleJoin(item.workspace_name);
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
    </>
  );
};

export default DashboardSearchWorkspace;
