import React from 'react';
import './Message.css';

function Message({message, timestamp, userName, userImage}) {
    return (
        <div className="message">
            <img src={userImage} alt={userName} />
            <div className="message__info">
            <h5>{userName} <span className="message__timestamp" >{timestamp}</span></h5>
        <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
