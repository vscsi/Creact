import React, {useEffect, useState, useRef} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import CanvasDraw from 'react-canvas-draw'
import ReactColorPicker from '@super-effective/react-color-picker';
import {getCurrentWorkspace} from '../../../../services/getCurrentWorkspace'
import './Whiteboard.css'

// https://github.com/dabit3/appsync-graphql-real-time-canvas/blob/master/src/Canvas.js

let socket


function WhiteboardContainer(props, {location}) {
  const ENDPOINT = 'localhost:4000';
  const saveableCanvas = useRef(null)

  const [my_socketid, setSocketId] =useState('');
  const [brushColor, setBrushColor] = useState('#3cd6bf');
  const [brushRadius, setBrushRadius] = useState(10);
  const [drawingData, setDrawingData] = useState(null);
  const [trigger, setTrigger] = useState(true)


  

  useEffect(()=> {
    // let data = {name: 'Charles', room: '1'};
    // const data = queryString.parse(location.search);
    // const {userid, room} = data;
    window.addEventListener('mouseup', (e)=> {
      console.log('mousup get' )
      let drawData = saveableCanvas.current.getSaveData();
      console.log(drawData)
    })
     socket = io(ENDPOINT, {
      path: '/canvas'
    });
    const workspaceName = getCurrentWorkspace();
    socket.on('onConnect', data=> {
      setSocketId(data.socket_id)
      console.log(my_socketid)
     
    })

    socket.emit('join', {workspaceName})

  },[ENDPOINT]);

  const onColorChange = (updatedColor) => {
    setBrushColor(updatedColor);
  };
  
  

  const sendtoSocket= (e) => {
    // localStorage.setItem(
    //   "savedDrawing",
    //   saveableCanvas.current.getSaveData()
    // );
    let drawData = saveableCanvas.current.getSaveData()
    socket.emit('sendDrawing', {data: drawData})
    
  }
  
  useEffect(()=> {
    socket.on('severtoClientDrawing', (data)=> {
      setDrawingData(data.data)
       
      console.log('here now', saveableCanvas.current)
      saveableCanvas.current.loadSaveData(
        data.data, true
      );
    })

  },[])

  




  return (
    <div className= "canvas" >
      <ReactColorPicker color={brushColor} onChange={onColorChange} />
      <div>
      <button onClick={()=>{
        saveableCanvas.clear();
      }} >Clear</button>
      <button onClick={()=>{
        saveableCanvas.undo();
      }} >Undo</button>
      
          <button
          onClick={() => {
            saveableCanvas.loadSaveData(
              drawingData
            );
          }}
        >
          Load
        </button>    

      </div>
      <div>
      <label>Brush-Radius:</label>
            <input
              type="number"
              value={brushRadius}
              onChange={e =>
                setBrushRadius( parseInt(e.target.value, 10))
              }
            />
      </div>

      <CanvasDraw 
        ref={saveableCanvas}
         brushColor={brushColor} brushRadius={brushRadius}
        canvasWidth={877}
        canvasHeight={777} />
    </div>
  )
}

export default WhiteboardContainer;
