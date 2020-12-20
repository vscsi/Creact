import React, {useCallback, useEffect, useRef, useState} from 'react';
import classes from "./CollaborationNote.module.css"
import {
    Editor, 
    EditorState,
    RichUtils,
    convertFromRaw,
    convertToRaw
} from 'draft-js';
import io from 'socket.io-client';
import {getCurrentWorkspace} from '../../../../services/getCurrentWorkspace'
import 'draft-js/dist/Draft.css';
import Axios from 'axios';


let socket

function MyEditor() {
    const ENDPOINT = 'localhost:4000';
    // const ENDPOINT = ${process.env.REACT_APP_API_SERVER};
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    //eslint-disable-next-line
    const [my_socketid, setSocketId] =useState('');    

        //=== save content ===//
    //eslint-disable-next-line
    const SaveDoc = useCallback(() => {
        const currentWorkspace = getCurrentWorkspace();
        const contentState = editorState.getCurrentContent();
        const docContent = JSON.stringify(convertToRaw(contentState))
        try{
            Axios.post(
                "https://localhost:4000/savedoc",
                // `${process.env.REACT_APP_API_SERVER}/savedoc`,
                {
                    docContent: docContent,
                    docName: currentWorkspace
                },
                {
                    headers: { "x-access-token": localStorage.getItem("token") },
                }
            )
            .then((res) => {
                console.log("get res from '/savedocs");
                console.log(res);
            })
        }catch (err){
            console.err();
        }
    })

    //eslint-disable-next-line
    const handler = useCallback ( e => {
        console.log('Keyup get, Charles the great' );
        const contentState = editorState.getCurrentContent();
        console.log('content state',  convertToRaw(contentState))
        const docSaveCard = JSON.stringify(convertToRaw(contentState));
        console.log('whats in saveCard', docSaveCard)
        socket.emit('saveCardFromClient', {data: docSaveCard})
      })
    
      useEventListener('keyup', handler)

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

      //eslint-disable-next-line
    const handleKeyCommand = useCallback((command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if(newState) {
            setEditorState(newState)

            return "handled"
        }
        return "not-handled"
    })

    //=== Style controls ===//
    
    //Inline Styles
    //eslint-disable-next-line
    const _onBoldClick = useCallback(() => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"))
    })
    
    //eslint-disable-next-line
    const _onItalicClick = useCallback(() => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"))
    })
    
    //eslint-disable-next-line
    const _onUnderlineClick = useCallback(() => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"))
    })
    
    //eslint-disable-next-line
    const _onCodeClick = useCallback(() => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "CODE"))
    })
    
    //Block Styles
    //eslint-disable-next-line
    const _onH1Click = useCallback(() =>{
        setEditorState(RichUtils.toggleBlockType(editorState, "header-one"))
    })
    //eslint-disable-next-line
    const _onH2Click = useCallback(() =>{
        setEditorState(RichUtils.toggleBlockType(editorState, "header-two"))
    })

    //eslint-disable-next-line
    const _onH3Click = useCallback(() =>{
        setEditorState(RichUtils.toggleBlockType(editorState, "header-three"))
    })

    //eslint-disable-next-line
    const _onH4Click = useCallback(() =>{
        setEditorState(RichUtils.toggleBlockType(editorState, "header-four"))
    })

    //eslint-disable-next-line
    const _onH5Click = useCallback(() =>{
        setEditorState(RichUtils.toggleBlockType(editorState, "header-five"))
    })

    //eslint-disable-next-line
    const _onH6Click = useCallback(() =>{
        setEditorState(RichUtils.toggleBlockType(editorState, "header-six"))
    })

    //eslint-disable-next-line
    const UL = useCallback(() => {
        setEditorState(RichUtils.toggleBlockType(editorState, "unordered-list-item"))
    })

    //eslint-disable-next-line
    const OL = useCallback(() => {
        setEditorState(RichUtils.toggleBlockType(editorState, "ordered-list-item"))
    })

    useEffect(()=> {
        socket = io(ENDPOINT, {
            path: '/colldoc'
          });
          const workspaceName = getCurrentWorkspace();
          socket.on('onConnect', data=> {
            setSocketId(data.socket_id)
           
          })
      
          socket.emit('join', {workspaceName})

          return () => {
            socket.disconnect();
          }
      

    },[ENDPOINT])
    


    useEffect(()=> {
        socket.on('servertoClientSaveCard', (data)=> {

            console.log('recevie from server, one take Charles')
            const content = data.data;
            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(content))))
        })

        console.log('editor state', editorState.getCurrentContent())
        //eslint-disable-next-line
    },[])


    return (
        <div className={classes.Doc}>
            {/* inline styles */}
            <button 
                onClick={_onBoldClick}
                className={classes.Bold}>
                    Bold
            </button>
            <button 
                onClick={_onItalicClick}
                className={classes.Italic}>
                    Italic
            </button>
            <button 
                onClick={_onUnderlineClick}
                className={classes.Underline}>
                    Underline
            </button>
            <button 
                onClick={_onCodeClick}
                className={classes.Code}>
                    Monospace
            </button>
            {/* block styles */}
            <button 
                onClick={_onH1Click}>
                    H1
            </button>
            <button 
                onClick={_onH2Click}>
                    H2
            </button>
            <button 
                onClick={_onH3Click}>
                    H3
            </button>
            <button 
                onClick={_onH4Click}>
                    H4
            </button>
            <button 
                onClick={_onH5Click}>
                    H5
            </button>            <button 
                onClick={_onH6Click}>
                    H6
            </button>
            <button 
                onClick={UL}>
                    UL
            </button>
            <button 
                onClick={OL}>
                    OL
            </button>
            <button
                onClick={SaveDoc}>
                Save
            </button>
            
            <Editor 
                editorState={editorState}
                handleKeyCommand={handleKeyCommand} 
                onChange={setEditorState} />
        </div>
    )
}


export default MyEditor