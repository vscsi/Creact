import React, { useState} from "react";
import RegisterCss from "./Register.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { FormHelperText } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import PublishIcon from "@material-ui/icons/Publish";
//eslint-disable-next-line
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import CreactLogo from '../../images/creactWhite.png';

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
  //eslint-disable-next-line
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

    } else if (
      //eslint-disable-next-line
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

  /**
   * Styling */
  const useStyles = makeStyles((theme) => ({
    paper: {
      fontFamily: 'Roboto',
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: '20vh'
    },

    /**creactLogo */
    creactLogo:{
    width: '10rem',
    height: '6rem',
    },

    avatar: {
      margin: '0 3vw 1vh 4vw',
      backgroundColor: '#048A81',
    },
    /**Form label text */
    formLabelText: {
      color: '#fff',
    },

    formLabelText2:{
      color: '#fff',
    },

    /** TextField*/ 
    textField: {
      color: '#fff',
      fontSize: '1.3rem'
    },
    
    /**helper text */
    helpTextField:{
      color: '#fff',
      fontSize: '1rem',
    },

    form: {
      width: "100%", // Fix IE 11 issue.
    },

    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    customButton: {
      background: '#f8f9fa',
      '&:hover':{
        color: '#f8f9fa',
        background: '#343a40',
      },
    },

    /**Upload button */
    uploadField: {
      margin:'1.5vh 0 1vh 0 ',
      padding: '0 0 0 1rem',
      color: '#fff'
    },

    /**image */
    // img: {
    //   position: 'sticky',
    //   left: '10vw',
    // },

  }));

  const classes = useStyles();

  return (
    <>
       {Object.keys(errors).length === 0 &&
        // Object.keys(serverError).length === 0 &&
        isSubmitting ? (
          <Redirect to="/login" />
        ) : (
        <Grid container direction="row" justify="center" alignItems="center" maxWidth="xs"
        style={{backgroundColor: '#333'}}
        >
            <div className={classes.paper}>
            <Grid container direction='row' justify='center'>
                <Grid item md ={6}>
                  {/* eslint-disable-next-line */}
                  <img className = {classes.creactLogo} src={CreactLogo}></img>
                </Grid>
                <Grid container item direction='column' xs={6}>
                <Avatar className={classes.avatar}>
                  <MeetingRoomIcon />
                </Avatar>
                <h1 className={RegisterCss.registerH1Container}>
                  Register in Creact!
                </h1>
              </Grid>
            </Grid>

            <Grid Container>
            </Grid>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid Container direction='row' justify='flex-end'>
                    {/* <FormLabel className = {classes.formLabelText}>Username</FormLabel> */}
                    <Grid item>
                      <TextField
                        placeholder="Enter your user name"
                        required
                        variant="outlined"
                        margin="normal"
                        inputLabelProps={{
                          className: classes.textField,
                        }}
                        inputProps={{
                          className: classes.textField,
                        }}
                        name="username"
                        type="text"
                        value={values.username}
                        onChange={handleChange}
                      />
                    </Grid>
                {errors.username ? (
                  <Grid item ><FormHelperText className ={classes.helpTextField}>{errors.username}</FormHelperText></Grid>
                ) : (
                  ""
                )}
                {serverError.username ? (
                  <FormHelperText className ={classes.helpTextField}>{serverError.username}</FormHelperText>
                ) : (
                  ""
                )}
                </Grid>


                <Grid Container direction='row'>
                  {/* <FormLabel className = {classes.formLabelText}>firstname</FormLabel> */}
                <TextField
                  placeholder="firstname"
                  variant="outlined"
                  margin="normal"
                  inputLabelProps={{
                    className: classes.textField,
                  }}
                  inputProps={{
                    className: classes.textField,
                  }}
                  required
                  name="firstname"
                  type="text"
                  value={values.firstname}
                  onChange={handleChange}
                />
                {errors.firstname ? (
                  <FormHelperText className ={classes.helpTextField}>{errors.firstname}</FormHelperText>
                ) : (
                  ""
                )}
              </Grid> 

                <Grid Container direction='row'>
                  {/* <FormLabel className = {classes.formLabelText}>lastname</FormLabel> */}
                <TextField
                  placeholder="lastname"
                  variant="outlined"
                  margin="normal"
                  inputLabelProps={{
                    className: classes.textField,
                  }}
                  inputProps={{
                    className: classes.textField,
                  }}
                  required
                  name="lastname"
                  type="text"
                  value={values.lastname}
                  onChange={handleChange}
                />
                {errors.lastname ? (
                  <FormHelperText className ={classes.helpTextField}>{errors.lastname}</FormHelperText>
                ) : (
                  ""
                )}
              </Grid>

              <Grid Container direction='row'>
                  {/* <FormLabel className = {classes.formLabelText2}>email</FormLabel> */}
                <TextField
                  placeholder="email"
                  variant="outlined"
                  margin="normal"
                  inputLabelProps={{
                    className: classes.textField,
                  }}
                  inputProps={{
                    className: classes.textField,
                  }}
                  required
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email ? (
                  <FormHelperText className ={classes.helpTextField}>{errors.email}</FormHelperText>
                ) : (
                  ""
                )}
                </Grid>

                <Grid Container direction='row'>
                  {/* <FormLabel className = {classes.formLabelText}>password</FormLabel> */}
                <TextField
                  placeholder="password"
                  variant="outlined"
                  margin="normal"
                  inputLabelProps={{
                    className: classes.textField,
                  }}
                  inputProps={{
                    className: classes.textField,
                  }}
                  required
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password ? (
                  <FormHelperText className ={classes.helpTextField}>{errors.password}</FormHelperText>
                ) : (
                  ""
                )}

                </Grid>

                <div>
                  <label htmlFor="upload-button">
                    {image.preview ? (
                      <div style={{ display: "flex" }}>
                      <img
                      src={image.preview}
                      alt="dummy"
                      width="200"
                      height="200"
                      className={classes.img}
                      />
                      </div>
                        ) : (
                          <>
                          <h5 className = {classes.uploadField}>
                            Press here to upload your photo
                          <PublishIcon />
                          </h5>
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
                 {errors.image ? (
                  <FormHelperText className ={classes.helpTextField}>{errors.image}</FormHelperText>
                ) : (
                  ""
                )}
                  <br />
                </div>
                <Button
                  className = {classes.customButton} 
                  variant="outlined"
                  type="submit"
                  fullWidth
                  onClick={() => setIsSubmitted(false)}
                >
                  Sign up
                </Button>
              </Grid>
            </form>
            </div>
        </Grid>
      )}
    </>
  );
}

export default RegisterContainer;
