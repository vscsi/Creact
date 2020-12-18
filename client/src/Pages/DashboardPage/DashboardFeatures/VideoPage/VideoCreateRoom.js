import React, { useState, useEffect } from 'react';
import { Jutsu, useJitsi } from 'react-jutsu';
import {  Link } from 'react-router-dom';
import VideoCreateRoomCss from './VideoCreateRoom.module.css';

function VideoCreateRoom({userName, currentWorkspace}) {
    //room represents hashed room
        const [room, setRoom] = useState('')
        const [customRoomName, setCustomRoomName] = useState('')
        const [password, setPassword] = useState('')
        const [call, setCall] = useState(false)
        const [jitsiInit, setJitsiInit] = useState({});
        const [deleteRoom, setDeleteRoom] = useState(false);
        const [videoUrl, setVideoUrl] = useState('');
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
            // setDeleteRoom(prevStatus => !prevStatus);
            return () => jitsiInit?.dispose?.();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        //events handling
        const handleClick = async(event) =>{
            event.preventDefault();
            // console.log(jitsiInit, 'this is jitsiInit');
            const body = { userName, currentWorkspace, customRoomName} // put values into body object
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
                setDeleteRoom(false)
                setPassword(response.password);
                setRoom(response.room);
                setVideoUrl(response.videoUrl)
                // console.log(response.room, response.password, 'this is room and password from respsonse');
                // console.log(room, password, 'this is current state of  room and password from respsonse');
                if (customRoomName) setCall(true);
                
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
           
           //deleting data from db
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
                    console.log(response.message);
                    setDeleteRoom(response.redirect);
                }catch(e){
                    console.error(e)
                }
            }
            const jitsiConfig = {
                configOverwrite:
                {
                remoteVideoMenu:
                {
                    disableKick: false,
                },
            },
            
        }
        const { jitsi } = useJitsi(jitsiConfig);
        console.log( jitsi, 'console log for reactJS warning');

        // const grabParticipantsId = () =>{
        //     jitsiInit.addEventListener('participantJoined', function(values){
        //         grabParticipantIdArr.push(values);
        //         console.log(grabParticipantIdArr, 'this is grabParticipantIdArr ');
        //     })
        // }
        

        return call && deleteRoom === false? ( 
            <>
            <div className={VideoCreateRoomCss.flexDivs}>
            <h6>You are the host of this meeting.</h6>
            <h6>Room name: {customRoomName}</h6>
            <h6>Password for participants: {password}</h6>
                <p>Please delete room before you go!</p> 
                 <button onClick={handleDelete}>Delete room</button>
            </div>
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
                containerStyles={{width: '100%', height: '80vh'}}
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
    
