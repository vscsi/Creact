import React from 'react';

import closeIcon from '../../Icons/closeIcon.png';
import onlineIcon from '../../Icons/onlineIcon.png';
import './InfoBar.css';

const InfoBar = ({room}) => (
    
    <div className='infoBar'>
        <div className='leftInnerContainer'>
            <img className="onlineIcon" src={onlineIcon} alt="online"/>
            <h3>{room}</h3>
        </div>
        <div className="rigthInnerContainer">
            <a href='/'><img className='onlineIcon' src={closeIcon} alt='close'/></a>

        </div>
    </div>)



export default InfoBar;