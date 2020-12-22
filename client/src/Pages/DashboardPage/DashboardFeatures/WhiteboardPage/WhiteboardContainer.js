import React, {useEffect, useState, useRef, useCallback} from 'react';
// import queryString from 'query-string';
import io from 'socket.io-client';
import CanvasDraw from 'react-canvas-draw'
import ReactColorPicker from '@super-effective/react-color-picker';
import {getCurrentWorkspace} from '../../../../services/getCurrentWorkspace'
import classes from './Whiteboard.module.css'



let socket
//eslint-disable-next-line
let drawData

function WhiteboardContainer(props, {location}) {
  // const ENDPOINT = 'localhost:4000';
  const ENDPOINT = process.env.REACT_APP_API_SERVER;
  const saveableCanvas = useRef(null)
  //eslint-disable-next-line
  const [my_socketid, setSocketId] =useState('');
  const [brushColor, setBrushColor] = useState('#3cd6bf');
  const [brushRadius, setBrushRadius] = useState(5);
  const [drawingData, setDrawingData] = useState(null);
  //eslint-disable-next-line
  const [trigger, setTrigger] = useState(true)

  
  //eslint-disable-next-line
  const handler = useCallback ( e => {
    // console.log('mousup get' )
    let drawData = saveableCanvas.current.getSaveData()
    // console.log('what is save data', drawData)
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
      // console.log(my_socketid)
     
    })

    socket.emit('join', {workspaceName})

    
    return () => {
      socket.disconnect();
    }
//eslint-disable-next-line
  },[ENDPOINT]);


  

  const onColorChange = (updatedColor) => {
    setBrushColor(updatedColor);
  };
  
  
//eslint-disable-next-line
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
      // console.log('drawdata received', data.data)
      // console.log('here now', saveableCanvas.current)
      //eslint-disable-next-line
      let receivedDrawing = JSON.stringify(data.data)

      setDrawingData(data.data)
      // console.log('drawing data set')
      
    })

  })

  useEffect(()=> {
    if (drawingData) {
      saveableCanvas.current.loadSaveData(drawingData, true)
    }
    


  },[drawingData])

  




  return (
    <div>
      <div className={classes.Canvasdiv}>
      <CanvasDraw 
        className={classes.CanvasArea}
        ref={saveableCanvas}
        brushColor={brushColor} brushRadius={brushRadius}
        canvasWidth={1200}
        canvasHeight={600} />
      </div>

      <div className={classes.PickerDiv}>
        <ReactColorPicker className={classes.Picker} color={brushColor} onChange={onColorChange} />
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
        <div className={classes.UndoRedo}>
          <button className={classes.Buttons} onClick={()=>{
            saveableCanvas.current.clear();
          }} >Clear</button>
        </div>
        <div className={classes.UndoRedo}>
          <button className={classes.Buttons} onClick={()=>{
            saveableCanvas.current.undo();
          }} >Undo</button>
        </div>
            {/* <button
            onClick={() => {
              saveableCanvas.loadSaveData(
                drawingData
              );
            }}
          >
            Load
          </button>     */}
        </div>
        <div>
        </div>
      </div>
  )
}

export default WhiteboardContainer;
