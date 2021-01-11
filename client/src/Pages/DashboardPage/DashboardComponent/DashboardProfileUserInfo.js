import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardMedia, Divider, Typography } from "@material-ui/core";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import blurBackground from "../../../images/blurbackground.jpg";
import {FaUserAlt} from 'react-icons/fa';
// import {RiLockPasswordLine} from 'react-icons/ri';
import {MdEmail} from 'react-icons/md';

const useStyles = makeStyles({
  root: {
    maxWidth:'100%',
    borderRadius: '10%',
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    marginTop: '10%',
    width: 150,
    borderRadius: "50%",
    borderColor: "#048A81",
    border: "0.2rem solid",
    backgroundColor: "black",
  },
  nameStyle: {
    fontWeight: "800",
    margin: 20,
    color: "white",
  },

  /**Card content */
  inputStyle: {
    margin: 30,
    fontSize: '1.3rem',
    color: '#fff',
  },

  iconMargin:{
    margin: '0 0.5vw 0 0 ',
  },

  profileBackground: {
    background: `no-repeat url(${blurBackground})`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  buttonStyle1: {
    "&:hover":{
      color: '#fff'
    },
    background: '#fff',
    margin: '0.5rem 0 0 1rem',

  },
  buttonStyle2: {
    "&:hover":{
      color: '#fff'
    },
    background: '#fff',
    margin: '0 0 0 1rem',

  },
  emailInput:{
    margin: '1rem 0 0 0'
  }
});



const DashboardProfileUserInfo = (props) => {
  const [show, setShow] = useState(false);
  const [showSubmit, setshowSubmit] = useState(false);
  const [email, setEmail] = useState('');
  const classes = useStyles();

  /**Event handling*/

const handleSubmit = async (e) =>{
    e.preventDefault();
    let username = props.userName;
    const body = {username, email};
    console.log(body);
    console.log(email);
    /** Change URL for deployment here */
    const url = `${process.env.REACT_APP_API_SERVER}/changeUserInfo`;
    // const url = "http://localhost:4000/changeUserInfo";
    if(!email){
      window.location.reload(false);
    }else{
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      console.log(response)
      console.log(result)
      window.location.reload(false);
    }
}

  return (
    <>
      <Card className={`${classes.root} ${classes.profileBackground}`}>
        {/* <div className={`${classes.profileBackground} `}>
        </div> */}
        <CardMedia className={`${classes.media} `} image={props.userImg} />
        {/* <img src={userPhoto}></img> */}
        <form onSubmit={(e)=>handleSubmit(e)}>
          <CardContent>
            <Typography align="center" variant="h6" className={classes.nameStyle}>
              {props.userFirstName} {props.userLastName}
            </Typography>
          </CardContent>
          <Divider />
          <CardContent>
            <Typography className={classes.inputStyle}>
            <FaUserAlt className ={classes.iconMargin}/>
              Username: {props.userName}
            </Typography>
            <Typography className={classes.inputStyle}>
              <MdEmail className ={classes.iconMargin}/>
                Email: {props.userEmail}
                {
                  show?<input className ={classes.emailInput} onChange={(e)=>setEmail(e.target.value)}/>:null
                }
                {
                  show? null:<Button className={classes.buttonStyle1} onClick={()=>setShow(!show)}>Edit email</Button>
                }
                
            </Typography>
            {
              show? 
              <Button type="submit" className={classes.buttonStyle2} onClick={(e)=>{setshowSubmit(!showSubmit)}}>Submit change</Button>:
              null
            }
          </CardContent>
        </form>
        {/* </div> */}
      </Card>
    </>
  );
};

export default DashboardProfileUserInfo;
