import React from "react";
import { v1 as uuid } from "uuid";
import { Button } from '@material-ui/core';
import VideoCreateRoomCss from './VideoCreateRoom.module.css'
// import VideoContainerCss from './VideoContainer.module.css'

const VideoCreateRoom = (props) => {
    function create() {
        const id = uuid();
        props.history.push(`/workspace/video/${id}`);
    }

    return (
        <div className={VideoCreateRoomCss.buttonStyle}>
            <Button 
            variant="contained" 
            color="primary" 
            onClick={create}>
                Create room
            </Button>
        </div>
    );
};

export default VideoCreateRoom;
