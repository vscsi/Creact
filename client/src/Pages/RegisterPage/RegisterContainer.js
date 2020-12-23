import React, { useState, useEffect } from "react";
import RegisterCss from "./Register.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { FormHelperText } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import PublishIcon from "@material-ui/icons/Publish";
import Axios from "axios";

function RegisterContainer() {
  /**
   * @param values setting states for input values
   * @param errors setting states for errors
   * @param serverError setting states for errors with response from server (check if  username repeated)
   */
  const [values, setValues] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState({});

  /**
   *used for toggle routes (back to login page)
   * @param isSubmitting tracks whether sign up button is clicked
   * @param isSubmitted checks whether no error and signup btn is clicked before updating database
   */

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [image, setImage] = useState({
    preview: "",
    raw: "",
    imageDisplay: "",
  });

  /**validating login*/
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

      // eslint-disable-next-line
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.email
      )
    ) {
      errors.email = "Email address is invalid";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password needs to be more than 8 characters";
    }

    // if (!values.image) {
    //   errors.image = "User Icon is required";
    // }

    return errors;
  };

  const handleImage = (e) => {
    if (e.target.files.length) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImage({
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0],
          imageDisplay: reader.result,
        });
      };
      const { name, value } = e.target;
      setValues({
        ...values, //make shallow copies of current states in object
        [name]: value, //replacing current values with newly changed values
      });
      console.log(name, value);
    }
  };

  //handling changes
  const handleChange = (event) => {
    setIsSubmitted(false);
    const { name, value } = event.target;
    setValues({
      ...values, //make shallow copies of current states in object
      [name]: value, //replacing current values with newly changed values
    });
  };

  //handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError({});
    setErrors(validateLogin(values));
    // setIsSubmitting(true);

    const formData = new FormData();
    formData.append("image", image.imageDisplay);
    const { username, firstname, lastname, email, password } = values;
    // const body = { username, firstname, lastname, email, password };
    formData.append("username", username);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password", password);
    // console.log(image);

    const url = "http://localhost:4000/register";
    // const url = `${process.env.REACT_APP_API_SERVER}/register`;
    const response = await fetch(url, {
      method: "POST",
      // headers: { "Content-Type": "multipart/form-data" },
      // body: JSON.stringify(body),
      body: formData,
    });
    const result = await response.json();
    console.log(result.userNameRepeated);
    if (result.userNameRepeated === true) {
      // console.log(result.userNameRepeated)
      setServerError({
        username: "username is already taken, please choose a new one.",
      });
    } else {
      setServerError({ username: "" });
      setIsSubmitting(true);
    }
    // postRegister();
    // console.log(isSubmitted)
    // console.log(test);
    // console.log(serverError);
    // console.log(errors);
    // console.log(Object.keys(errors).length);
    // if (
    //   Object.keys(errors).length === 0 &&
    //   Object.keys(serverError).length === 0
    // ) {
    //   setIsSubmitted(true);
    // }
    //if no errors at this stage, can redirect to /login?
  };

  // //if there are no errors, go ahead to submit
  // useEffect(() => {
  //   console.log(`render the page`);
  //   // console.log(isSubmitted)
  //   console.log(errors);
  //   console.log(serverError);
  //   if (
  //     Object.keys(errors).length === 0 &&
  //     Object.keys(serverError).length === 0 &&
  //     isSubmitting
  //   ) {
  //     setIsSubmitted(true);
  //     // window.location = "/login"
  //   }
  //   // setTimeout(() => {
  //   //   if (
  //   //     Object.keys(errors).length === 0 &&
  //   //     Object.keys(serverError).length === 0 &&
  //   //     isSubmitting
  //   //   ) {
  //   //     setIsSubmitted(true);
  //   //   }
  //   // }, 2000);

  //   // console.log(errors, serverError)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [errors, serverError]);

  return (
    <>
      {Object.keys(errors).length === 0 &&
      // Object.keys(serverError).length === 0 &&
      isSubmitting ? (
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
              {serverError.username ? (
                <FormHelperText>{serverError.username}</FormHelperText>
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
              <div>
                <label htmlFor="upload-button">
                  {image.preview ? (
                    <img
                      src={image.preview}
                      alt="dummy"
                      width="300"
                      height="300"
                    />
                  ) : (
                    <>
                      <div style={{ display: "flex" }}>
                        <h5 className="text-center">Upload your photo</h5>
                        <PublishIcon />
                      </div>
                    </>
                  )}
                </label>
                <TextField
                  placeholder="image"
                  name="image"
                  type="file"
                  value={values.image}
                  onChange={handleImage}
                  id="upload-button"
                  style={{ display: "none" }}
                />
                {/* <input
                  type="file"
                  id="upload-button"
                  style={{ display: "none" }}
                  onChange={handleImage}
                  name="image"
                  value={values.image}
                /> */}
                {/* {errors.image ? (
                  <FormHelperText>{errors.image}</FormHelperText>
                ) : (
                  ""
                )} */}
                <br />
                {/* <button onClick={handleUpload}>Upload</button> */}
              </div>
              <Button
                variant="outlined"
                type="submit"
                onClick={() => setIsSubmitted(false)}
              >
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
