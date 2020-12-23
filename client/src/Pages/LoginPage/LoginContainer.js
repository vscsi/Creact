import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { AiOutlineLogin } from "react-icons/ai";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LoginCss from './Login.module.css'
// import {
//   // Link as RouterLink,
//   // Route,
//   // BrowserRouter as Router,
// } from "react-router-dom";
import { createBrowserHistory } from "history";
import Axios from "axios";
import { FormLabel } from "@material-ui/core";
import CreactLogo from '../../images/creactWhite.png';


// import AuthService from "../../services/auth.service";

// import DashboardContainer from "../DashboardPage/DashboardContainer";
// import RegisterContainer from "../RegisterPage/RegisterContainer";

// function Copyright() {
//   return (
//     <h5 className = {LoginCss.copyright} align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://creact-app.com">
//         CREACT
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </h5>
//   );
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    fontFamily: 'Roboto',
    marginTop: '30vh',
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  /**creactLogo */
  creactLogo:{
    width: '10rem',
    height: '6rem',
  },

  /**Signin text */
  signinText:{
    color: '#fff',
    width: '15vw',
    margin: '1vh 0 0 0'
  },

  /**Textfield */
  textField: {
    color: "#fff",
  },
  
  avatar: {
    margin:'0 0 0 2.5vw',
    backgroundColor: '#048A81',
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  singUp:{
    color: '#fff',
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#000',
    background: '#f8f9fa',
      '&:hover':{
        color: '#f8f9fa',
        background: '#343a40',
      },
  },


}));

export default function SignIn() {
  const classes = useStyles();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line 
  const [loginStatus, setLoginStatus] = useState(false);

  const history = createBrowserHistory();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      // console.log("Submit user login data to db");
      const body = {
        username,
        password,
      };
      const result = await fetch("http://localhost:4000/login", {
      // const result = await fetch(`${process.env.REACT_APP_API_SERVER}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      //1. will have JWT token as returned value, and save it into local storage
      //2. history.push("/workspace"), redirect to /workspace
      const response = await result.json();
      if (!response.auth) {
        setLoginStatus(false);
      } else {
        // console.log(response);
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem('userName', response.userName)
        setLoginStatus(true);
        history.push("/profile");
        window.location.reload();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const checkAuth = () => {
    try {
      Axios.get("http://localhost:4000/isUserAuth", {
      // Axios.get(`${process.env.REACT_APP_API_SERVER}/isUserAuth`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((res) => {
        // console.log(res);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
        <Grid container direction="row" justify="center" alignItems="center" maxWidth="xs"
        style={{backgroundColor: '#333'}}
        >
          <div className={classes.paper}>
            <Grid container direction='row' justify='center'>
              <Grid item xs={6}>
                <img className = {classes.creactLogo} src={CreactLogo}></img>
              </Grid>
                <Grid container item direction='column' xs={6}>
                  <Avatar className={classes.avatar}>
                    <AiOutlineLogin />
                  </Avatar>
                  <h1 className={classes.signinText}>
                    Sign in
                  </h1>
              </Grid>
            </Grid>
          <form className={classes.form} noValidate onSubmit={onSubmitForm}>
          <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                >
              <Grid Container direction='row'>
                <TextField
                  InputLabelProps={{
                    // className: classes.textField,
                    style: { color: '#fff' },
                  }}
                  InputProps={{
                    // className: classes.textField,
                    style: { color: '#fff' },
                  }}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  placeholder="username"
                  id="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={(e) => setUserName(e.target.value)}
                  />
             </Grid>   
              <Grid Container direction='row'>
                <TextField
                inputLabelProps={{
                  className: classes.textField,
                }}
                inputProps={{
                  className: classes.textField,
                }}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                placeholder="password"
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
              <Grid container justify='center'>
                  <Grid item>
                    <Link style={{ textDecoration: 'none' }} href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
              </Grid>
             </Grid>   
             <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
        </Grid>
    </>
  );
}
