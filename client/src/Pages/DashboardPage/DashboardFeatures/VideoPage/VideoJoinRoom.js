import {React, useState, useEffect} from 'react'
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Grid from '@material-ui/core/Grid';
import { Motion, spring } from "react-motion";

// eslint-disable-next-line 
function VideoJoinRoom({userName, currentWorkspace, url, pw, roomName}) {
        const [jitsi, setJitsi] = useState({});

        useEffect(()=>{
          console.log('This is from VideoJoinRoom')
        },[])

        //Jitsi config
        //create a container for jitsi
        const jitsiContainerId = "jitsi-container-id";

        //add Jitsi meet api script 
        const loadJitsiScript = () => {
            let resolveLoadJitsiScriptPromise = null;

            const loadJitsiScriptPromise = new Promise((resolve) => {
            resolveLoadJitsiScriptPromise = resolve;
            });

            const script = document.createElement("script");
            script.src = "https://meet.jit.si/external_api.js";
            script.async = true;
            script.onload = resolveLoadJitsiScriptPromise
            document.body.appendChild(script);

            return loadJitsiScriptPromise;
        };

        //load Jitsi Iframe
        const initialiseJitsi = async () => {
            if (!window.JitsiMeetExternalAPI) {
            await loadJitsiScript();
            }

            const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
            parentNode: document.getElementById(jitsiContainerId),
            
            });

            setJitsi(_jitsi)
        };

        useEffect(() => {
            initialiseJitsi();
            return () => jitsi?.dispose?.();
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []);

          const iframeAllow = "camera; microphone; fullscreen; display-capture";

          

        return (
          <>
          {/* <h1>Video Join room</h1>
          <h2>You are in room: {roomName}</h2>
        <h2>You are the participant of the room.</h2> */}
          {/* eslint-disable-next-line */}

          <Grid
          container
          direction='column'
          alignItems = 'center'
          >
              <Grid 
              item
              >
              <iframe allow={iframeAllow} 
              src={url}
              style=
              {{height: "80vh",
               width: "100vh",
               marginTop: "2vh",
               boxShadow: '0.5rem 0.5rem 0.5rem #888888'
               }}></iframe>
              </Grid>
              <Grid>
              <Motion
              defaultStyle={{ x: -300, opacity: 0 }}
              style={{
                x: spring(0),
                opacity: spring(1)
              }}
              >
                {
                  style => (
                    <SnackbarContent 
                    message={
                      `
                      You are in room: ${roomName} and 
                      you are the participant of the room.
                      `
                    }
                    style = {{
                      width: '50vw', 
                      marginBottom: '5vh',
                      transform: `translateX(${style.x}px)`,
                      opacity: style.opacity
                    }}
                    />
                  )
                }
              </Motion>
            </Grid>
        </Grid>
          </>
        )
}

export default VideoJoinRoom
