import React, { useState, useEffect } from 'react';
import { Jutsu } from 'react-jutsu';
import { v1 as uuid } from "uuid";
// import {
//         useHistory,
// } from "react-router-dom";
    
    function VideoCreateRoom({userName, workspaces, currentWorkspace}) {
        const [room, setRoom] = useState('')
        const [call, setCall] = useState(false)
        const [password, setPassword] = useState('')
        const [jitsi, setJitsi] = useState({});
        // const history = useHistory();
        // const [hostEndMeeting, setHostEndMeeting] = useState(false);

        //create a container for jitsi
        const jitsiContainerId = "jitsi-container-id";

        const handleClick = event => {
            event.preventDefault()
            if (room) setCall(true);
        }

        const handleSubmit = async(event) =>{
            event.preventDefault();
            const generatePassword = uuid();
            setPassword(generatePassword);
            const videoUrl = `meet.jit.si/${room}`
            const body = {userName, workspaces, currentWorkspace, password, room, videoUrl} // put values into body object
            console.log(body, password, 'body and password for testing');
            try{
                console.log('sending video room info to server')
                const sendVideo = await fetch(`http://localhost:4000/workspace/${currentWorkspace}/video`,{
                    method:"POST",
                    headers: {
                        "Content-Type":"application/json",
                        "x-access-token": localStorage.getItem("token")
                    },
                    body: JSON.stringify(body)
                })
                const response = await sendVideo.json();
                console.log(response);
            }catch(e){
                console.error(e.message);
            }
        }
        
        
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

            const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
            parentNode: document.getElementById(jitsiContainerId),
            
            });

            setJitsi(_jitsi)
        };

        useEffect(() => {
            initialiseJitsi();
            return () => jitsi?.dispose?.();
        }, []);

            //a useEffect here
            //making meeting end when host leaves:
            /**
             //get id of all participants and put into array
            //storing .json object from participantJoined
            //check if participant is moderator
            //if is moderator, set State in onMeetingEnd() and trigger kickParticipant and loop through the id
            * 
            */

        // useEffect(()=>{
        // history.push(`/workspace/${currentWorkspace}/video/${room}`)
        // },[call])

        return call ? (
            <Jutsu
            roomName={room}
            displayName={userName}
            password={password}
            onMeetingEnd={() => console.log('Meeting has ended')}
            loadingComponent={<p>loading ...</p>}
            errorComponent={<p>Oops, something went wrong</p>} 
            containerStyles={{width: '100%', height: '80%', marginTop:'5%'}}
            />
        ) : (
            <form onSubmit={handleSubmit}>
                <input required id='room' type='text' placeholder='Enter name of video room' value={room} onChange={(e) => setRoom(e.target.value)} />
                <button onClick={handleClick} type='submit' target="_blank">
                    Start video conferencing
                </button>
            </form>
    )
    }
    
    export default VideoCreateRoom
    
    // import {React, useState, useEffect} from "react";
    // import { v1 as uuid } from "uuid";
    // import { Button, TextField, Grid } from '@material-ui/core';
    // import {
    //     useHistory,
    //     Link
    // } from "react-router-dom";

    // const VideoCreateRoom = ({userName,workspaces,currentWorkspace}) => {
    //     const [videoRoomName, setVideoRoomName] = useState('');
    //     const [displayRoomName, setDisplayRoomName] = useState([]);
    //     const history = useHistory();

    //     async function handleSubmit(e) {
    //         e.preventDefault();
    //         const videoRoomId = uuid();
    //         //redirecting to video conf room
    //         history.push(`/workspace/${currentWorkspace}/video/${videoRoomId}`);
    //         console.log(`user ${userName} is in video create room with multiple workspaces ${workspaces} and current workspace ${currentWorkspace}` );
    //         const body = {userName,workspaces, videoRoomId, currentWorkspace, videoRoomName} // put values into body object
    //         console.log(body);
    //         try{
    //             console.log('sending video room info to server')
    //             const sendVideo = await fetch(`http://localhost:4000/workspace/${currentWorkspace}/video/${videoRoomId}`,{
    //                 method:"POST",
    //                 headers: {
    //                     "Content-Type":"application/json",
    //                     "x-access-token": localStorage.getItem("token")
    //                 },
    //                 body: JSON.stringify(body)
    //             })
    //             const response = await sendVideo.json();
    //             console.log(response);
    //         }catch(e){
    //             console.error(e.message);
    //         }
            
    //     }

    //     const handleChange=(event)=>{
    //         const{value}=event.target;
    //         setVideoRoomName(value)
    //     }

    //     useEffect(()=>{
    //         async function postVideoJoinRoom(){
    //             const body = {currentWorkspace};
    //             try{
    //                 const joinRoom = await fetch(`http://localhost:4000/workspace/${currentWorkspace}/video`,{
    //                     method:"POST",
    //                     headers: {
    //                         "Content-Type":"application/json",
    //                         "x-access-token": localStorage.getItem("token")
    //                     },
    //                     body: JSON.stringify(body)
    //                 })
    //                 const response = await joinRoom.json();
    //                 console.log('postVideoJoinRoom from client/VideoCreateRoom',response)

    //                 //if only 1 user in workspace , response:

    //                 //if no video room is created, response: 

    //                 //if there are video rooms in same workspace
    //                 setDisplayRoomName(
    //                     displayRoomName.concat(response.videoRoomNames)
    //                 );
    //             }catch(e){
    //                 console.error(e.message);
    //             }
    //         }
    //         postVideoJoinRoom();
    //         console.log(setDisplayRoomName);
    //     },[])
        
    //     return (
    //         <Grid container
    //             alignItems='center'
    //             direction='column'
    //             >
    //                 <Grid item xs={3}>
    //                 <form onSubmit={handleSubmit}>
    //                     <TextField 
    //                     id="filled-basic" label="Enter name of room" variant="filled" 
    //                     value={videoRoomName}
    //                     onChange={handleChange}
    //                     required
    //                     />
    //                     <Button 
    //                     variant="contained" 
    //                     color="primary" 
    //                     type = "submit"
    //                     >
    //                         Create room
    //                     </Button>
    //                 </form>
    //                 </Grid>

    //                 {/* Joining video rooms */}
    //                 {
    //                     displayRoomName.map((item,index)=>{
    //                     <Grid item xs={3}>
    //                         <Button 
    //                         variant="contained" 
    //                         >
    //                             <Link href={`/workspace/${currentWorkspace}/video/${item}`} key={index}>
    //                                 Join room 
    //                                 <p>Room: {item}</p>
    //                             </Link>
    //                         </Button>
    //                     </Grid>
    //                     })
    //                 }
                    
    //             </Grid>
    //     );
    // };

    // export default VideoCreateRoom;
