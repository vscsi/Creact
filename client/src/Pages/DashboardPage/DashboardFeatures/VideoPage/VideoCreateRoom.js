import React, { useState, useEffect } from 'react';
import { Jutsu, useJitsi } from 'react-jutsu';
import {  Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import {RiMacLine} from 'react-icons/ri';
import {FaWpforms} from 'react-icons/fa';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import sunset from '../../../../images/sunset.jpg';
import {
    // withStyles,
    makeStyles,
    // createMuiTheme,
    // theme
  } from '@material-ui/core/styles';
  import { Motion, spring } from "react-motion";
// import {CopyToClipboard} from 'react-copy-to-clipboard';

    
function VideoCreateRoom({userName, currentWorkspace}) {
    //room represents hashed room
        const [room, setRoom] = useState('')
        const [customRoomName, setCustomRoomName] = useState('')
        const [password, setPassword] = useState('')
        const [call, setCall] = useState(false)
        const [jitsiInit, setJitsiInit] = useState({});
        const [deleteRoom, setDeleteRoom] = useState(false);
        // console.log(deleteRoom, 'for react warning')
        // const [value, setValue] = useState('');
        // const [copied, setCopied] = useState(false);
        // const [hostEndMeeting, setHostEndMeeting] = useState(false);
        // const grabParticipantIdArr = [];

        //Jitsi config
        //create a container for jitsi
        const jitsiContainerId = "jitsi-container-id";

        //add Jitsi meet api script 
        const loadJitsiScript = () => {
            let resolveLoadJitsiScriptPromise = null;

            const loadJitsiScriptPromise = new Promise((resolve) => {
            resolveLoadJitsiScriptPromise = resolve;
            });

            const script = document.createElement("script");
            script.src = "https://meet.jit.si/external_api.js";
            script.async = true;
            script.onload = resolveLoadJitsiScriptPromise
            document.body.appendChild(script);

            return loadJitsiScriptPromise;
        };

        //load Jitsi Iframe
        const initialiseJitsi = async () => {
            if (!window.JitsiMeetExternalAPI) {
            await loadJitsiScript();
            }
            // eslint-disable-next-line 
            const myOverwrite ={
                 remoteVideoMenu: {
                        // If set to true the 'Kick out' button will be disabled.
                        disableKick: true
                    },
            }
            const options = {
                parentNode: document.getElementById(jitsiContainerId),
                // configOverwrite: myOverwrite
            }
            const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", options); 
            setJitsiInit(_jitsi)
        };

        useEffect(() => {
            initialiseJitsi();
            return () => jitsiInit?.dispose?.();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        //events handling
        const handleClick = async(event) =>{
            event.preventDefault();
            // console.log(jitsiInit, 'this is jitsiInit');
            const body = { userName, currentWorkspace, customRoomName} // put values into body object
            try{
                // console.log('sending video room info to server')
                const sendVideo = await fetch(`http://localhost:4000/workspace/${currentWorkspace}/video`,{
                // const sendVideo = await fetch(`${process.env.REACT_APP_API_SERVER}/workspace/${currentWorkspace}/video`,{
                    method:"POST",
                    headers: {
                        "Content-Type":"application/json",
                        "x-access-token": localStorage.getItem("token")
                    },
                    body: JSON.stringify(body)
                })
                const response = await sendVideo.json();
                setRoom(response.room);
                setPassword(response.password);
                if (customRoomName) setCall(true);
                // console.log(response.room, response.password, 'this is password and room');
            }catch(e){
                console.error(e.message);
            }
        }

        const handleDelete = async(event)=>{
            event.preventDefault();
            const body = { userName, room, password} // put values into body object
            try{
                console.log('sending video delete request to server')
                const deleteVideo = await fetch(`http://localhost:4000/workspace/${currentWorkspace}/video`,{
                    method:"DELETE",
                    headers: {
                        "Content-Type":"application/json",
                        "x-access-token": localStorage.getItem("token")
                     },
                     body: JSON.stringify(body)
                 })
                 const response = await deleteVideo.json();
                //  console.log(response.message);
                 setDeleteRoom(response.redirect);
             }catch(e){
                 console.error(e)
             }
         }

            //making meeting end when host leaves:
            /**
             //get id of all participants and put into array
            //storing .json object from participantJoined
            //check if participant is moderator
            //if is moderator, set State in onMeetingEnd() and trigger kickParticipant and loop through the id
            * 
            */
        const jitsiConfig = {
            configOverwrite:
            {
                remoteVideoMenu:
                {
                    disableKick: true,
                },
            },
            
        }
        //eslint-disable-next-line
        const { loading,  jitsi } = useJitsi(jitsiConfig);
        // console.log(loading,  jitsi, 'console log for reactJS warning');

        // const grabParticipantsId = () =>{
        //     const participants = jitsiInit.addEventListener('participantJoined', function(values){
        //         grabParticipantIdArr.push(values);
        //         console.log(grabParticipantIdArr, 'this is grabParticipantIdArr ');
        //     })
        // }
        
        /**Styling */
        const useStyles = makeStyles((theme) => ({
            root: {
                '& label.Mui-focused': {
                    color: '#fff',
                  },
            },
            margin: {
                margin: '1rem',
            },

            /**Containers */

            /**Cards */
            videoConfCard:{
                width: '90vw',
                height: '100vh',
                background: `linear-gradient(-45deg, #ee7752, #E73C7E, #23A6D5, #23D5AB)`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            },

            /**Buttons */
            customButton: {
                borderRadius: 40,
                boxShadow: "0 3px 5px 2px rgba(255, 200, 200, .3)",
                maxWidth: '50%',
                maxHeight: '50%',
                margin: '1%',
                '&:hover': {
                    textDecoration: 'none',
                },

            },

            customButton2: {
                borderRadius: 40,
                boxShadow: "0 3px 5px 2px rgba(255, 200, 200, .3)",
                maxWidth: '50%',
                maxHeight: '50%',
                margin: '1%',
                '&:hover': {
                    textDecoration: 'none',
                },

            },

            /** Typography */ 
            greetingsVideoConferencing:{
                paddingTop: '1.5rem',
                paddingLeft: '1.5rem',
                color: '#fff'
            },
            
            startVideoConferencingSpacing: {
                paddingLeft: '1.5rem',
                paddingRight: '1rem',
                paddingBottom: '1rem',
                color: '#fff'

            },

            /**TextField */
            textFieldInputLabel:{
                color: '#fff'
            },

            /**icons */
            iconColor: {
                background: '#fff'
            },

            /**SnackbarContent */
            SnackbarContentSpacing:{
                margin: '0.5vw', 
            }

        }));
        const classes = useStyles();
        
      

        return call  && deleteRoom === false ? ( 
            <>
                <Grid
                container
                justify='center'
                >
                    <Jutsu
                    roomName={room}
                    displayName={userName}
                    password={password}
                    onMeetingEnd={
                        () => {
                            // jitsiInit.dispose();
                            console.log('find me');
                            // grabParticipantsId();
                        }
                    }
                    loadingComponent={<p>loading ...</p>}
                    errorComponent={<p>Oops, something went wrong</p>} 
                    containerStyles={{
                        width: '90%', 
                        height: '80vh', 
                        marginTop: '1%', 
                        marginBottom: '1%',
                        boxShadow: '0.5rem 0.5rem 0.5rem #888888'
                    }}
                    configOverwrite= {jitsiConfig.configOverwrite}
                    />
                     <Motion
                    defaultStyle={{ x: -300, opacity: 0 }}
                    style={{
                        x: spring(0),
                        opacity: spring(1)
                    }}
                    >
                        {
                            style => (
                                <SnackbarContent
                                className = {`${classes.SnackbarContentSpacing}`}
                                message={`
                                You are the host of this meeting: ${customRoomName} 
                                **Password for participants: ${password}
                                `
                                }
                                style = {{
                                    transform: `translateX(${style.x}px)`,
                                    opacity: style.opacity
                                }}
        
                                // action={
                                    //     <CopyToClipboard
                                //     onCopy={()=>setCopied(true)}
                                //     >
                                //         Copy password
                                //     </CopyToClipboard>
                                // }
                                />
                                
                                
                                )
                            }
                        </Motion>
                                    <Motion
                                   defaultStyle={{ x: -300, opacity: 0 }}
                                   style={{
                                       x: spring(0),
                                       opacity: spring(1)
                                    }}
                                    >

                            {
                                style => (
                                    <SnackbarContent
                                    className = {`${classes.SnackbarContentSpacing}`}
                                    message={
                                        `
                                        Please delete room before you go!
                                        `
                                    }
                                    action={
                                        <Button
                                        variant="contained"
                                        className={`${classes.customButton}`}
                                        onClick={handleDelete}
                                        >
                                        Delete Room
                                            </Button>
                                    }
                                    style = {{
                                        transform: `translateX(${style.x}px)`,
                                        opacity: style.opacity
                                    }}
                                    
                                    />
                                    )
                                }
                </Motion>
                {/* <h6>You are the host of this meeting.</h6>
                <h6>Room name: {customRoomName}</h6>
                <h6>Password for participants: {password}</h6>
                    <p>Please delete room before you go!</p>  */}

                </Grid>
            </>
                    
        ) : (
            <>
                <form>
                        <Grid
                        container 
                        className = {`${classes.videoConfCard}`}
                        alignContent="left"
                        justify='center'
                        direction="column"
                        wrap="no-wrap"
                        >
                    
                            <Grid 
                            item
                            >
                                    <Typography 
                                    variant='h4'
                                    className = {`${classes.greetingsVideoConferencing}`}
                                    >
                                        Hi {userName},
                                    </Typography>
                                    <Typography
                                        variant='h5'
                                        className = {`${classes.startVideoConferencingSpacing}`}
                                        
                                        >
                                        start video conferencing with your friends!
                                    </Typography>
                            </Grid>
                            <Grid
                            container
                            direction='row'
                            alignContent='center'
                            >
                                    
                                    <TextField 
                                    className={`${classes.margin} ${classes.root}`}
                                    label="Input Name of meeting."
                                    variant="outlined"
                                    id='name' 
                                    placeholder='Name of meeting' 
                                    required
                                    InputLabelProps={{
                                        className: classes.textFieldInputLabel,
                                    }}
                                    inputProps={{
                                        className: classes.textFieldInputLabel,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <FaWpforms 
                                                className = {`${classes.iconColor}`}
                                                    
                                            />
                                            </InputAdornment>
                                        ),
                                        }}
                                    value={customRoomName} 
                                    onChange={(e) => 
                                        {
                                            // console.log(e.target.value)
                                            // console.log(customRoomName)
                                            setCustomRoomName(e.target.value)
                                        }
                                    } />
                                    <Button 
                                    startIcon={<RiMacLine/>}
                                    variant="contained"
                                    className={`${classes.customButton}`}
                                    onClick={handleClick} type='submit' target="_blank">
                                        <Typography>Start</Typography>
                                    </Button>
                                <Button
                                variant="contained"
                                className={`${classes.customButton2}`}
                                inputProps={{ disableUnderline: true }}
                                >
                                    <Link style={{textDecoration: 'none', color: '#000'}} to ={`/workspace/${currentWorkspace}/video/rooms`}>
                                    <Typography>Check out other video rooms</Typography>
                                    </Link>
                                </Button>
                            </Grid>
                </Grid>
                </form>
            </>
            
    )
    }
    
    export default VideoCreateRoom
    
