import {React, useState, useEffect} from "react";
import { v1 as uuid } from "uuid";
import { Button, TextField, Grid } from '@material-ui/core';
import {
    useHistory,
    Link
  } from "react-router-dom";

const VideoCreateRoom = ({userName,workspaces,currentWorkspace}) => {
    const [videoRoomName, setVideoRoomName] = useState('');
    const [displayRoomName, setDisplayRoomName] = useState([]);
    const history = useHistory();

    async function handleSubmit() {
        const id = uuid();
        //redirecting to video conf room
        history.push(`/workspace/${currentWorkspace}/video/${id}`);
        console.log(`user ${userName} is in video create room with multiple workspaces ${workspaces} and current workspace ${currentWorkspace}` );
        const body = {userName,workspaces,id, currentWorkspace, videoRoomName} // put values into body object
        console.log(body);
        try{
            const sendVideo = await fetch(`http://localhost:4000/workspace/${currentWorkspace}/video/${id}`,{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            })
            const response = await sendVideo.json();
            console.log(response);
            console.log(displayRoomName);
        }catch(e){
            console.error(e.message);
        }
        
    }

    const handleChange=(event)=>{
        const{value}=event.target;
        setVideoRoomName(value)
    }

    useEffect(()=>{
        async function postVideoJoinRoom(){
            const  body = {currentWorkspace};
            try{
                const joinRoom = await fetch(`http://localhost:4000/workspace/${currentWorkspace}/video`,{
                    method:"POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify(body)
                })
                const response = await joinRoom.json();
                console.log('postVideoJoinRoom from client/VideoCreateRoom',response)

                //if only 1 user in workspace , response:

                //if no video room is created: 

                //if there are video rooms in same workspace
                setDisplayRoomName(
                    displayRoomName.concat(response.videoRoomNames)
                );
            }catch(e){
                console.error(e.message);
            }
        }
        postVideoJoinRoom();
    },[])
    
    return (
        <Grid container
            alignItems='center'
            direction='column'
            >
                <Grid item xs={3}>
                <form onSubmit={handleSubmit}>
                    <TextField 
                    id="filled-basic" label="Filled" variant="filled" 
                    value={videoRoomName}
                    onChange={handleChange}
                    required
                    />
                    <Button 
                    variant="contained" 
                    color="primary" 
                    type = "submit"
                    >
                        Create room
                    </Button>
                </form>
                </Grid>

                {/* Joining video rooms */}
                {
                    displayRoomName.map((item,index)=>{
                    <Grid item xs={3}>
                        <Button 
                        variant="contained" 
                        >
                            <Link href={`/workspace/${currentWorkspace}/video/${item}`} key={index}>
                                Join room 
                                <p>Room: {item}</p>
                            </Link>
                        </Button>
                    </Grid>
                    })
                }
                
            </Grid>
    );
};

export default VideoCreateRoom;
