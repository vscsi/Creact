import {React, useState} from 'react'
import {
  Route,
} from "react-router-dom";
import VideoConferenceRoom from './VideoConferenceRoom';
import VideoCreateRoom from './VideoCreateRoom';
import VideoJoinRoom from './VideoJoinRoom';

function VideoContainer({userName,currentWorkspace}) {
  const [joinVideo, setJoinVideo] = useState(false)
  const [joinRoomUrl, setJoinRoomUrl] = useState('');
  const [joinRoomPw, setRoomPw] = useState('');
  const [joinRoomName, setJoinRoomName] = useState('');

  function handleVideoJoinClick(item){
    // console.log(item['video_room_url'], item['video_room_pw'], item[video_room_name], 'this is from handleVideoJoinClick')
    console.log(item.item.video_room_url, 'this is from handleVideoJoinClick')
    setJoinVideo(true)
    // setTimeout(()=> console.log(joinVideo, 'this is value from VideoContainer after'), 
    //   2000)
    setJoinRoomUrl(item.item.video_room_url)
    setRoomPw(item.item.video_room_pw)
    setJoinRoomName(item.item.video_room_name)
    console.log(joinVideo, joinRoomUrl,'this is joinVideo from VideoContainer');
  }

  return joinVideo ?(
    <>
      <Route
      path={`/workspace/${currentWorkspace}/video/rooms/join`}
      render={(props)=><VideoJoinRoom {...props} userName={userName} currentWorkspace={currentWorkspace} url={joinRoomUrl} pw={joinRoomPw} roomName={joinRoomName}/>}  
      exact
      />
      </>              
  ):(
    <>
    <Route
          path={`/workspace/:${currentWorkspace}/video`}
          render={(props)=><VideoCreateRoom {...props} userName={userName} currentWorkspace={currentWorkspace}/>}
          exact
          />
    <Route 
          path={`/workspace/${currentWorkspace}/video/rooms`}
          render={(props)=><VideoConferenceRoom handleClick ={handleVideoJoinClick} {...props} currentWorkspace={currentWorkspace}/>}  
          exact
          />
  </>
  )
}

export default VideoContainer
