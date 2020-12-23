import React from "react";
import "./Message.css";

function Message({ message, timestamp, userName, userImage }) {
  return (
    <div className="message">
      <img src={userImage} alt={userName} />
      <div>
        <p  className="message__info" >
          <span className="message__username">{userName}</span>
          <span className="message__timestamp">{timestamp}</span>
        </p>
        <p className="message__message">{message}</p>
      </div>
    </div>
  );
}

export default Message;
