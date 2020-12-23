import React from 'react'

import './ChatInput.css'

function ChatInput({message, setMessage, sendMessage }) {
    return (
        <div className="chatInput">
            <form>
                <input
                  placeholder="Type your message..."  
                  value={message}
                  onChange={(e)=> setMessage(e.target.value)} ></input>
                <button type="submit" onClick={sendMessage} ></button>
            </form>
            
        </div>
    )
}

export default ChatInput;   
