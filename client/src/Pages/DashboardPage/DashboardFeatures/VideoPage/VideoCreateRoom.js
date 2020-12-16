import React, { useState, useEffect } from 'react';
import { Jutsu, useJitsi } from 'react-jutsu';
import {  Link } from 'react-router-dom';

    
function VideoCreateRoom({userName, currentWorkspace}) {
    //room represents hashed room
        const [room, setRoom] = useState('')
        const [customRoomName, setCustomRoomName] = useState('')
        const [password, setPassword] = useState('')
        const [call, setCall] = useState(false)
        const [jitsiInit, setJitsiInit] = useState({});
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
            console.log(jitsiInit, 'this is jitsiInit');
            const body = { userName, currentWorkspace, customRoomName} // put values into body object
            try{
                console.log('sending video room info to server')
                // const sendVideo = await fetch(`http://localhost:4000/workspace/${currentWorkspace}/video`,{
                const sendVideo = await fetch(`${process.env.REACT_APP_API_SERVER}/workspace/${currentWorkspace}/video`,{
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
                console.log(response.room, response.password, 'this is password and room');
            }catch(e){
                console.error(e.message);
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
        const { loading,  jitsi } = useJitsi(jitsiConfig);
        console.log(loading,  jitsi, 'console log for reactJS warning');

        // const grabParticipantsId = () =>{
        //     const participants = jitsiInit.addEventListener('participantJoined', function(values){
        //         grabParticipantIdArr.push(values);
        //         console.log(grabParticipantIdArr, 'this is grabParticipantIdArr ');
        //     })
        // }
        
        // useEffect(()=>{
        //     console.log(jitsiInit)
        //     grabParticipantsId();
        // }, [jitsiInit])

        return call ? ( 
            <>
            <h1>You are the host of this meeting.</h1>
            {/* <h2>password for participants to join this meeting: </h2> */}
            <Jutsu
            roomName={room}
            displayName={userName}
            password={password}
            onMeetingEnd={
                () => {
                    console.log('Meeting has end')
                }
            }
            loadingComponent={<p>loading ...</p>}
            errorComponent={<p>Oops, something went wrong</p>} 
            containerStyles={{width: '100%', height: '70%'}}
            configOverwrite= {jitsiConfig.configOverwrite}
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
    
