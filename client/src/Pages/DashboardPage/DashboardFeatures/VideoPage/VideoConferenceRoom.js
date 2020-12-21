import React, { useEffect, useState } from "react";
import { Paper } from '@material-ui/core';
import {
    Link,
  } from "react-router-dom";
// import Link from "@material-ui/core/Link";

const VideoConferenceRoom = ({currentWorkspace, handleClick}) => {
    const [currentVideoRoom, setCurrentVideoRoom] = useState([]);

    useEffect(()=>{
        
        const getVideo = async()=>{
            const body = {currentWorkspace};
                try{
                    const getVideoInfo = await fetch(`http://localhost:4000/workspace/${currentWorkspace}/video/rooms`,{
                    // const getVideoInfo = await fetch(`${process.env.REACT_APP_API_SERVER}/workspace/${currentWorkspace}/video/rooms`,{
                        method:"POST",
                        headers: {
                            "Content-Type":"application/json",
                            "x-access-token": localStorage.getItem("token")
                        },
                        body: JSON.stringify(body)
                    })
                    const response = await getVideoInfo.json();
                    //the ...response.videoRooms allows you to access each element in the array that is returned
                    setCurrentVideoRoom([...response.videoRooms])
                    // console.log(response.videoRooms.video_room_pw); 
                    // console.log(currentVideoRoom);
                    
                }catch(e){
                    console.error(e.message);
                }
            }
        getVideo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleConferenceClick = (item)=>{
        handleClick(item)
    }

    return currentVideoRoom&&currentVideoRoom.length>1?(
    <>
         <h1>Join the video meetings happening in this workspace!</h1>
                        {currentVideoRoom.map((item) => (
                            <Paper elevation={3}>
                            <p>Room {item.id}</p>
                            <p>Room name: {item.video_room_name}</p>
                            <p>Room password(use this password to join the meeting!) : {item.video_room_pw}</p>
                            <p>Room url: {item.video_room_url}</p>
                            <button  onClick={()=>handleConferenceClick({item})}>
                                <Link to ={`/workspace/${currentWorkspace}/video/rooms/join`}>
                                {/* <Link to ={item.video_room_url} href={item.video_room_url} target="_blank"> */}
                                    Join meeting
                                </Link>
                                {/* <Route path={item.video_room_url} component={() => { 
                                     window.location.href = item.video_room_url; 
                                }}/> */}
                                {/* </Link> */}
                            </button>
                            </Paper>
                        ))}
                            </>
            ):(
                <h1>No video meetings now.</h1>
            )
            
};

export default VideoConferenceRoom;
