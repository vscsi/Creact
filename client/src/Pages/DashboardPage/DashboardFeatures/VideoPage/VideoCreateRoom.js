import React from "react";
import { v1 as uuid } from "uuid";
import { Button,Grid } from '@material-ui/core';
import VideoCreateRoomCss from './VideoCreateRoom.module.css'

const VideoCreateRoom = (props) => {
    async function create() {
        const id = uuid();
        const name = props.name;
        const workspaces = props.workspaces;
        const workspaceName = props.workspaceName;
        props.history.push(`/workspace/${workspaceName}/video/${id}`);
        
        console.log(`user ${name} is in video create room ` );
        console.log(props.history)
        
        const body = {name,workspaces, workspaceName,id} // put values into body object
        try{
            const sendVideo = await fetch(`http://localhost:4000/workspace/video/`,{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            })
            const response = await sendVideo.json();

        }catch(e){
            console.error(e.message);
        }
    }

    return (
        <div className={VideoCreateRoomCss.buttonStyle}>
            <Button 
            variant="contained" 
            color="primary" 
            onClick={create}>
                Create room
            </Button>
            <Button 
            variant="contained" 
            >
                Join room
            </Button>
        </div>
    );
};

export default VideoCreateRoom;
