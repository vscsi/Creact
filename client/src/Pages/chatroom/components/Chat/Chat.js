import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import Display from '../Display/Display'
import './Chat.css'
let socket;


//useEffect 


const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [roomUsers, setRoomUsers] = useState('');
    
    const ENDPOINT = 'localhost:4000';


    useEffect(()=> {
        const data = queryString.parse(location.search);
        const {name, room} = data;

        socket = io(ENDPOINT, {
            path:'/chatroom'
        });

        setName(name);
        setRoom(room);

        console.log(socket)

        socket.emit('join', {name, room} )

        //this is willunmount cycle
        return () => {
            // socket.emit('disconnect');
            
            socket.off();
        }

        
        //when will the use effect called?
    }, [ENDPOINT, location.search])


    useEffect(()=> {
        socket.on('message', (message)=> {
            setMessages([...messages, message])
        })
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, ()=> setMessage(''))
        }
    }

    useEffect(()=> {
        socket.on('roomData', ({users})=> {
            setRoomUsers(users);
        })
    }, [name])

    // console.log(messages)

    return (
        <div  className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} 
                setMessage={setMessage}
                sendMessage={sendMessage} />
            </div>
                <Display users={roomUsers} />
        </div>
    )
}

export default Chat; 