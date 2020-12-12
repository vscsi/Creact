import React, { useState, useEffect } from "react";
import RegisterCss from "./Register.module.css";
// import LoginContainer from "../LoginPage/LoginContainer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { FormHelperText } from "@material-ui/core";
import {
  // Link as RouterLink,
  // Route,
  // BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

function RegisterContainer() {
  //setting states for values
  const [values, setValues] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  //setting states for errors
  const [errors, setErrors] = useState({});

  //used for toggle routes (back to login page)
  //isSubmitting tracks whether sign up button is clicked
  //isSubmitted checks whether no error and signup btn is clicked before updating database
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [isUsernameRepeated, setIsUsernameRepeated] = useState(false);

  //validating login
  const validateLogin = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = "username is required";
    }

    if (!values.firstname) {
      errors.firstname = "firstname is required";
    }

    if (!values.lastname) {
      errors.lastname = "lastname is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password needs to be more than 8 characters";
    }
    return errors;
  };

  //handling  changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name,value,values,values.email)
    setValues({
      ...values, //make shallow copies of current states in object
      [name]: value, //replacing current values with newly changed values
    });
  };

  //handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateLogin(values));
    console.log(errors);
    console.log(Object.keys(errors).length);
    setIsSubmitting(true);
  };

  //if there is no errors, go ahead to submit
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      setIsSubmitted(true);
    }
  }, [isSubmitting, errors]);

  useEffect(() => {
    const { username, firstname, lastname, email, password } = values;
    const body = { username, firstname, lastname, email, password };
    // const url = "http://localhost:4000/register";
    const url = `${process.env.REACT_APP_API_SERVER}/register`;
    async function postRegister() {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const result = await response.json();
        console.log(result);
    } catch (e) {
        console.error(e.message);
      }
    }
    postRegister();
  }, [isSubmitted, values]);

  return (
    <>
      {isSubmitted ? (
        <Redirect to="/login" />
      ) : (
        <Grid container direction="column" justify="center" alignItems="center">
          <h1 className={RegisterCss.registerH1Container}>
            Register in Creact!
          </h1>

          <form onSubmit={handleSubmit} noValidate>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <TextField
                placeholder="Enter your user name"
                name="username"
                type="text"
                value={values.username}
                onChange={handleChange}
              />
              {errors.username ? (
                <FormHelperText>{errors.username}</FormHelperText>
              ) : (
                ""
              )}

              <TextField
                placeholder="firstname"
                name="firstname"
                type="text"
                value={values.firstname}
                onChange={handleChange}
              />
              {errors.firstname ? (
                <FormHelperText>{errors.firstname}</FormHelperText>
              ) : (
                ""
              )}

              <TextField
                placeholder="lastname"
                name="lastname"
                type="text"
                value={values.lastname}
                onChange={handleChange}
              />
              {errors.lastname ? (
                <FormHelperText>{errors.lastname}</FormHelperText>
              ) : (
                ""
              )}

              <TextField
                placeholder="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email ? (
                <FormHelperText>{errors.email}</FormHelperText>
              ) : (
                ""
              )}

              <TextField
                placeholder="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password ? (
                <FormHelperText>{errors.password}</FormHelperText>
              ) : (
                ""
              )}

              <Button variant="outlined" type="submit">
                Sign up
              </Button>
            </Grid>
          </form>
        </Grid>
      )}
    </>
  );
}

export default RegisterContainer;
