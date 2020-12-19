import React, {useEffect, useState, useRef, useCallback} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import CanvasDraw from 'react-canvas-draw'
import ReactColorPicker from '@super-effective/react-color-picker';
import {getCurrentWorkspace} from '../../../../services/getCurrentWorkspace'
import './Whiteboard.css'

// https://github.com/dabit3/appsync-graphql-real-time-canvas/blob/master/src/Canvas.js

let socket
let drawData

function WhiteboardContainer(props, {location}) {
  const ENDPOINT = 'localhost:4000';
  const saveableCanvas = useRef(null)

  const [my_socketid, setSocketId] =useState('');
  const [brushColor, setBrushColor] = useState('#3cd6bf');
  const [brushRadius, setBrushRadius] = useState(10);
  const [drawingData, setDrawingData] = useState(null);
  const [trigger, setTrigger] = useState(true)

  
  
  const handler = useCallback ( e => {
    console.log('mousup get' )
    let drawData = saveableCanvas.current.getSaveData()
    console.log('what is save data', drawData)
    // let parsed = JSON.parse(drawData)
    socket.emit('sendDrawing', {data:drawData})
  })
  useEventListener('mouseup', handler)

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
    // localStorage.setItem(
    //   "savedDrawing",
    //   saveableCanvas.current.getSaveData()
    // );
    let saveddrawData = saveableCanvas.current.getSaveData();
    
    // let parsed = JSON.parse(drawData)
    socket.emit('sendDrawing', {data:saveddrawData})
    
  }
  
  function useEventListener(eventName, handler, element = window){
    const savedHandler = useRef();
    useEffect(()=> {
      savedHandler.current = handler;
    }, [handler])

    useEffect( ()=> {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      
      const eventListener = event => savedHandler.current(event);
  
      element.addEventListener(eventName, eventListener);
  
      return() => {
        element.removeEventListener(eventName, eventListener);
      }
    }, [eventName, element]  )


  }
  
  useEffect(()=> {
    socket.on('severtoClientDrawing', (data)=> {
      console.log('drawdata received', data.data)
      console.log('here now', saveableCanvas.current)
      let receivedDrawing = JSON.stringify(data.data)

      setDrawingData(data.data)
      console.log('drawing data set')
      
    })

  })

  useEffect(()=> {
    if (drawingData) {
      saveableCanvas.current.loadSaveData(drawingData, true)
    }
    


  },[drawingData])

  




  return (
    <div className= "canvas" >
      <ReactColorPicker color={brushColor} onChange={onColorChange} />
      <div>
      <button onClick={()=>{
        saveableCanvas.current.clear();
      }} >Clear</button>
      <button onClick={()=>{
        saveableCanvas.current.undo();
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
        canvasWidth={1000}
        canvasHeight={500} />
    </div>
  )
}

export default WhiteboardContainer;
