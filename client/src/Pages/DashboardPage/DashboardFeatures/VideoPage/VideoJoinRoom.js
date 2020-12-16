import {React, useState, useEffect} from 'react'
import { Jutsu } from 'react-jutsu';

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

        return (
          <Jutsu
            roomName={roomName}
            password={pw}
            displayName={userName}
            onMeetingEnd={() => console.log('Meeting has ended')}
            loadingComponent={<p>loading ...</p>}
            errorComponent={<p>Oops, something went wrong</p>} 
            containerStyles={{width: '100%', height: '80%', marginTop:'5%'}}
          />
        )
}

export default VideoJoinRoom
