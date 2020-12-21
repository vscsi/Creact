import React, { useEffect, useState } from "react";
import { Card } from '@material-ui/core';
import {
    Link,
    Route
  } from "react-router-dom";
// import Link from "@material-ui/core/Link";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import InputAdornment from '@material-ui/core/InputAdornment';
import {
    withStyles,
    makeStyles,
    createMuiTheme,
    theme
  } from '@material-ui/core/styles';
  import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
                    console.log(response.videoRooms.video_room_pw); 
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

    /**Styling */
    const useStyles = makeStyles((theme)=>({

        /**Typography */
        typographyMargin: {
            margin: '1rem'
        },

        /**Table */
        tableHeader: {
            fontWeight: '600',
        },

        tableContainer: {
            margin: '1rem'
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
            }
        },
    }));
    const classes = useStyles();

    return currentVideoRoom&&currentVideoRoom.length>1?(
    <>
         <Typography
         variant='h3'
         className = {`${classes.typographyMargin}`} 
         >
             Join the video meetings happening in this workspace!
        </Typography>
        <Grid
        container
        direction='row'
        spacing = {2}
        >
            <TableContainer
            className = {`${classes.tableContainer}`}
            component={Paper}
            >
                        <TableHead
                        >
                            <TableCell
                            className = {`${classes.tableHeader}`}
                            >
                                Room number
                            </TableCell>
                            <TableCell
                            className = {`${classes.tableHeader}`}
                            >
                                Room name
                            </TableCell>
                            <TableCell
                            className = {`${classes.tableHeader}`}
                            >
                                Room password(use this password to join the meeting!)
                            </TableCell>
                            <TableCell
                            className = {`${classes.tableHeader}`}
                            >
                                Room Url
                            </TableCell>
                            <TableCell
                            className = {`${classes.tableHeader}`}
                            >
                                Join now
                            </TableCell>
                        
                        </TableHead>
                {currentVideoRoom.map((item) => (
                    <TableRow>
                            
                                <TableCell
                                >
                                {item.id}
                                </TableCell>
                            <TableCell>
                                <Typography>
                                {item.video_room_name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                            {item.video_room_pw}
                            </TableCell>
                            <TableCell>
                             {item.video_room_url}
                            </TableCell>
                            <TableCell>
                            <Button 
                            variant="contained"
                            className= {classes.customButton}
                            onClick={()=>handleConferenceClick({item})}>
                            <Link to ={`/workspace/${currentWorkspace}/video/rooms/join`}>
                            {/* <Link to ={item.video_room_url} target ='_blank'> */}
                                Join meeting
                            </Link>
                            </Button>
                            </TableCell>
                        </TableRow>

                ))}
            </TableContainer>
        </Grid>
     </>
):(
                <h1>No video meetings now.</h1>
)
/**comments */
             {/*
                // <Grid 
                // item
                // md = {6}
                // >
                <Card
                    className = {`${classes.cardLayout}`}
                    >
                        
                    <Typography>Room {item.id}</Typography>
                    <Typography>Room name: {item.video_room_name}</Typography>
                    <Typography>Room password(use this password to join the meeting!) : {item.video_room_pw}</Typography>
                    <Typography>Room url: {item.video_room_url}</Typography>
                    <button onClick={()=>handleConferenceClick({item})}>
                        <Link to ={`/workspace/${currentWorkspace}/video/rooms/join`}>
                            Join meeting
                        </Link>
                    </button>
                     </Card> 
                    </Grid>
                    */}
};

export default VideoConferenceRoom;
