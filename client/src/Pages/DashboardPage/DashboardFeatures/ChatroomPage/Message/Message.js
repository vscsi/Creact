import React from 'react';
import './Message.css';

function Message({message, timestamp, userName, userImage}) {
    return (
        <div className="message">
            <img src={userImage} alt={userName} />
            <div className="message__info">
            <p><span className ="message__username">{userName}</span><span className="message__timestamp" >{timestamp}</span></p>
            <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
