import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const DashboardProfileUserInfo = () => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root}>
        <CardContent>
            <Typography align='center'>
                firstName lastName
            </Typography>
            <Typography>
                Username: martin
            </Typography>
            <Typography>
                Password: ********
            </Typography>
            <Typography>
                Email: martin@gmail.com
            </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardProfileUserInfo;
