import React, {useState, useEffect} from 'react'
import io from 'socket.io-client';
import queryString from 'query-string';
import ScrollToBottom from 'react-scroll-to-bottom';
import ChatInput from "./ChatInput/ChatInput"
import HelpIcon from '@material-ui/icons/Help';
import Message from './Message/Message'
import "./Chat.css";
let socket;

function ChatroomContainer({location}) {
  const ENDPOINT = 'localhost:4000';
  const [my_userid, setUserid] = useState('');
  const [my_name, setName] = useState('');
  const [my_room, setRoom] = useState('');
  const [my_socketid, setSocketId] =useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [roomUsers, setRoomUsers] = useState('');


  useEffect(()=> {
    // let data = {name: 'Charles', room: '1'};
    const data = queryString.parse(location.search);
    const {userid, room} = data;
     socket = io(ENDPOINT, {
      path: '/chatroom'
    });

    socket.on('onConnect', data=> {
      setSocketId(data.socket_id)
     
    })

    

    setUserid(userid);
    
    setRoom(room);

    
    socket.emit('join', {userid, room})

    return () => {
      socket.emit('disconnect', {socket_id: my_socketid});
      
      socket.off();
  }


  }, [ENDPOINT, location.search]);

  useEffect(()=> {
    socket.on('usersInRoom', (data)=> {
    console.log('usersInRoom received' )
    let result = [];
     data.usersInRoom.map((user)=> {
      let name=user.name;
      let capname = name.charAt(0).toUpperCase() + name.slice(1)
      result.push(capname)
      return result
    })
    setRoomUsers( result.join(' '));

    // console.log('userInRoom', result.join(' '))
  })
  }, [roomUsers])

  

  //Get history 
  useEffect(()=> {
    if (my_room) {
      socket.emit('chatHistory', my_room);
    }
   
  }, [my_room])
    
  


  useEffect(()=> {
    socket.on('returnHistory', (data)=> {
      
      
      const updatedmessages = data.rows.map(msg => {
        return {
          message: msg.chatmessage_content,
          timestamp: (new Date(msg.created_at)).toLocaleString(),
          userName: msg.first_name,
          userImage: 'https://picsum.photos/200'
        }
      })
      // console.log('on return History', updatedmessages)
      let readydata = [...messages];
      
      updatedmessages.map( item => {
        return readydata.push(item)
      });
      // console.log('readydata', readydata)
      setMessages(readydata)
    })
    
  }, [])

  useEffect(()=> {
    socket.on('eachMessage', (_)=>{
      socket.emit('chatHistory', my_room);
    })
  }, [my_room])


  //get message
  useEffect(()=> {
    
    socket.on('message', (message)=> {
      
      setMessages([...messages, message])
    })
    
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', {message:message, userId: my_userid, roomId: my_room}, ()=> setMessage(''))
      
    }

  }

  
  

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong># Room Name</strong>
            <span className="user__in__room" > {roomUsers}</span>
          </h4>
        </div>
        <div className="chat__headerRight">
          <HelpIcon /> 
        </div>
      </div>
      <ScrollToBottom className="chat__messages" >
        {messages.map(({userName, message, userImage, timestamp}, i)=> {
          return(
            <Message 
              key={i}
              message={message}
              userImage={userImage}
              timestamp={timestamp}
              userName={userName} />
          ) 
        })}
      </ScrollToBottom>
      <ChatInput 
        setMessage={setMessage}
        sendMessage={sendMessage}
        message={message} 
        name={my_userid} />
    </div>
  )
}

export default ChatroomContainer;
