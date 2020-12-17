import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import CanvasDraw from 'react-canvas-draw'
import ReactColorPicker from '@super-effective/react-color-picker';
import {getCurrentWorkspace} from '../../../../services/getCurrentWorkspace'
import './Whiteboard.css'


let socket


function WhiteboardContainer(props, {location}) {
  const ENDPOINT = 'localhost:4000';
  let saveableCanvas;

  const [my_socketid, setSocketId] =useState('');
  const [brushColor, setBrushColor] = useState('#3cd6bf');
  const [brushRadius, setBrushRadius] = useState(10);
  const [drawingData, setDrawingData] = useState(null);
  const [trigger, setTrigger] = useState(true)


  useEffect(()=> {
    // let data = {name: 'Charles', room: '1'};
    // const data = queryString.parse(location.search);
    // const {userid, room} = data;
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
    localStorage.setItem(
      "savedDrawing",
      saveableCanvas.getSaveData()
    );
    socket.emit('sendDrawing', {data: localStorage.getItem("savedDrawing")})
    console.log(typeof localStorage.getItem("savedDrawing"))
  }
  
  useEffect(()=> {
    socket.on('severtoClientDrawing', (data)=> {
      setDrawingData(data.data)
      console.log('are you here', saveableCanvas)
    })

  }, [])

  




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
        ref={canvasDraw => (saveableCanvas = canvasDraw)}
        onChange={sendtoSocket} brushColor={brushColor} brushRadius={brushRadius}
        canvasWidth={877}
        canvasHeight={777} />
    </div>
  )
}

export default WhiteboardContainer;
