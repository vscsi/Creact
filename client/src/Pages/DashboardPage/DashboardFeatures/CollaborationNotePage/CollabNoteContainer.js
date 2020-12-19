import React, {useCallback, useEffect} from 'react';
// import classes from "./CollaborationNote.module.css"
import {
    Editor, 
    EditorState,
    RichUtils,
    convertFromRaw,
    convertToRaw
} from 'draft-js';
import 'draft-js/dist/Draft.css';

import BlockStyleControls from './components/BlockStyles';
import InlineStyleControls from './components/InlineStyles';

function MyEditor() {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    const handleKeyCommand = useCallback((command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if(newState) {
            setEditorState(newState)

            return "handled"
        }
        return "not-handled"
    })
    // const _onBoldClick = useCallback(() => {
    //     setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"))
    // })

    // const _onItalicClick = useCallback(() => {
    //     setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"))
    // })

    // const _onUnderlineClick = useCallback(() => {
    //     setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"))
    // })

    // const _onCodeClick = useCallback(() => {
    //     setEditorState(RichUtils.toggleInlineStyle(editorState, "CODE"))
    // })


    return (
        <>
            {/* <button 
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
                    Code
            </button> */}
            <BlockStyleControls
                editorState={editorState}/>
            <InlineStyleControls 
                editorState={editorState}/>
            <Editor 
                editorState={editorState}
                handleKeyCommand={handleKeyCommand} 
                onChange={setEditorState} />
        </>
    )
}


export default MyEditor