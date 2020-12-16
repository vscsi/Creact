import React, { useState, useEffect } from 'react';
import { Jutsu } from 'react-jutsu';
import { Route, Link } from 'react-router-dom';
import { v1 as uuid } from "uuid";
import VideoConferenceRoom from './VideoConferenceRoom';
    
function VideoCreateRoom({userName, currentWorkspace}) {
    //room represents hashed room
        const [room, setRoom] = useState('')
        const [customRoomName, setCustomRoomName] = useState('')
        const [password, setPassword] = useState('')
        const [call, setCall] = useState(false)
        const [jitsi, setJitsi] = useState({});
        // const [hostEndMeeting, setHostEndMeeting] = useState(false);

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

            const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
            parentNode: document.getElementById(jitsiContainerId),
            interfaceConfigOverwrite:{
                disableKick: true
            },
            configOverwrite:{
                disableKick: true
            },
            });

            setJitsi(_jitsi)
        };

        useEffect(() => {
            initialiseJitsi();
            return () => jitsi?.dispose?.();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        //events handling


        const handleClick = async(event) =>{
            const generatePassword = uuid();
            const generateRoom = uuid();
            event.preventDefault();
            setPassword(generatePassword);
            setRoom(generateRoom);
            // console.log(generatePassword, 'this is generatePassword')
            // console.log(generateRoom, 'this is generatewRoom')
            console.log(password, 'this is password')
            console.log(room, 'this is room')
            const videoUrl = `meet.jit.si/${room}`
            if (customRoomName&&room&&password) setCall(true);
            const body = {room, userName, currentWorkspace, password, customRoomName, videoUrl} // put values into body object
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

            //a useEffect here
            //making meeting end when host leaves:
            /**
             //get id of all participants and put into array
            //storing .json object from participantJoined
            //check if participant is moderator
            //if is moderator, set State in onMeetingEnd() and trigger kickParticipant and loop through the id
            * 
            */


        return call ? (
            <>
            <h1>You are the host of this meeting.</h1>
            <h2>password for participants to join this meeting: {password}</h2>
            {/* <div id={jitsiContainerId} >

            </div> */}
            <Jutsu
            id={jitsiContainerId}
            roomName={room}
            displayName={userName}
            password={password}
            onMeetingEnd={() => console.log('Meeting has end')}
            loadingComponent={<p>loading ...</p>}
            errorComponent={<p>Oops, something went wrong</p>} 
            containerStyles={{width: '100%', height: '70%'}}
            
            />
            </>
                    
        ) : (
            <>
            <form>
                <button onClick={handleClick} type='submit' target="_blank">
                    Start video conferencing
                </button>
                <input id='name' type='text' placeholder='Name' value={customRoomName} onChange={(e) => setCustomRoomName(e.target.value)} />
            </form>
            <button>
                <Link to ={`/workspace/${currentWorkspace}/video/rooms`}>
                    Check out video rooms
                </Link>
                
            </button>
            </>
            
    )
    }
    
    export default VideoCreateRoom
    
