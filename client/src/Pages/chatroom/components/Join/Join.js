import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import './Join.css'


const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="name" className="joinInput" type="test" onChange={(e)=>setName(e.target.value)} /></div>
                <div><input placeholder="room" className="joinInput mt-20" type="test" onChange={(e)=> setRoom(e.target.value)} /></div>
                <Link 
                    onClick={e => (!name || !room) ? e.preventDefault() : null} 
                    to={`/workspace/chatroom/chat?name=${name}&room=${room}`} >
                    <button className="button mt-20" type="submit">Go In</button>
                </Link>
            </div>

        </div>
    )
}

export default Join; 