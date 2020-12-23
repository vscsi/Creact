import React, { useEffect, useState, useRef, useCallback } from "react";
// import queryString from 'query-string';
import io from "socket.io-client";
import CanvasDraw from "react-canvas-draw";
import ReactColorPicker from "@super-effective/react-color-picker";
import { getCurrentWorkspace } from "../../../../services/getCurrentWorkspace";
import classes from "./Whiteboard.css";

let socket;
//eslint-disable-next-line
let drawData;

function WhiteboardContainer(props, { location }) {
  const ENDPOINT = "localhost:4000";
  // const ENDPOINT = process.env.REACT_APP_API_SERVER;
  const saveableCanvas = useRef(null);
  //eslint-disable-next-line
  const [my_socketid, setSocketId] = useState("");
  const [brushColor, setBrushColor] = useState("#3cd6bf");
  const [brushRadius, setBrushRadius] = useState(5);
  const [drawingData, setDrawingData] = useState(null);
  //eslint-disable-next-line
  const [trigger, setTrigger] = useState(true);

  //eslint-disable-next-line
  const handler = useCallback((e) => {
    // console.log('mousup get' )
    let drawData = saveableCanvas.current.getSaveData();
    // console.log('what is save data', drawData)
    // let parsed = JSON.parse(drawData)
    socket.emit("sendDrawing", { id: socket.id, data: drawData });
  });
  useEventListener("mouseup", handler);

  useEffect(() => {
    // let data = {name: 'Charles', room: '1'};
    // const data = queryString.parse(location.search);
    // const {userid, room} = data;

    socket = io(ENDPOINT, {
      path: "/canvas",
    });
    const workspaceName = getCurrentWorkspace();
    socket.on("onConnect", (data) => {
      setSocketId(data.socket_id);
      // console.log(my_socketid)
    });

    socket.emit("join", { workspaceName });

    return () => {
      socket.disconnect();
    };
    //eslint-disable-next-line
  }, [ENDPOINT]);

  const onColorChange = (updatedColor) => {
    setBrushColor(updatedColor);
  };

  //eslint-disable-next-line
  const sendtoSocket = (e) => {
    // localStorage.setItem(
    //   "savedDrawing",
    //   saveableCanvas.current.getSaveData()
    // );
    let saveddrawData = saveableCanvas.current.getSaveData();

    // let parsed = JSON.parse(drawData)

    socket.emit("sendDrawing", { id: socket.id, data: saveddrawData });
  };

  function useEventListener(eventName, handler, element = window) {
    const savedHandler = useRef();
    useEffect(() => {
      savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      const eventListener = (event) => savedHandler.current(event);

      element.addEventListener(eventName, eventListener);

      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    }, [eventName, element]);
  }

  useEffect(() => {
    socket.on("severtoClientDrawing", (data) => {
      // console.log('drawdata received', data.data)
      // console.log('here now', saveableCanvas.current)
      //eslint-disable-next-line
      let receivedDrawing = JSON.stringify(data.data);

      setDrawingData(data.data);
      // console.log('drawing data set')
    });
  });

  useEffect(() => {
    if (drawingData) {
      saveableCanvas.current.loadSaveData(drawingData, true);
    }
  }, [drawingData]);

  return (
    <div className="container">
      
      <div className="items-container">
      <div className="colorpicker">
      <ReactColorPicker
          className=""
          color={brushColor}
          onChange={onColorChange}
        />
        </div>
          <div className="items">
            <button
              className="button"
              onClick={() => {
                saveableCanvas.current.clear();
              }}
            >
              Clear
            </button>
          </div>
          <div className="items">
            <button
              className={'button'}
              onClick={() => {
                saveableCanvas.current.undo();
              }}
            >
              Undo
            </button>
          </div>
          <div className="items__radius">
          <label>Brush-Radius:</label>
          <input
            className="items__radius__input"
            type="number"
            value={brushRadius}
            onChange={(e) => setBrushRadius(parseInt(e.target.value, 10))}
          />
        </div>
        </div>
      <div className="canvas">
        <CanvasDraw
          className={classes.CanvasArea}
          ref={saveableCanvas}
          brushColor={brushColor}
          brushRadius={brushRadius}
          canvasWidth={1000}
          canvasHeight={500}
        />
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
  );
}

export default WhiteboardContainer;
