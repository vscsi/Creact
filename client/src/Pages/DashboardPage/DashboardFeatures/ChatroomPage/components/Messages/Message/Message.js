import React from 'react';
import ReactEmoji from 'react-emoji';

import './Message.css'


const Message = ({message, name}) => {
    const trimmedName = name.trim().toLowerCase();
    let isSender = false;

    if (message.user === trimmedName) {
        isSender = true;
    }
    return (
        isSender ? (
            <div className='messageContainer justifyEnd'>
                <p className="sentText pr-10">{trimmedName}</p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{ReactEmoji.emojify(message.text)}</p>
                </div>
            </div>
        ) : (
            <div className='messageContainer justifyStart'>
                <div className="messageBox backgourdLight">
                    <p className="messageText colorDark">{ReactEmoji.emojify(message.text)}</p>
                </div>
                <p className="sentText pl-10">{message.user}</p>
            </div>

        )
    )

}

export default Message;