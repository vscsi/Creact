import React, {useCallback, useEffect} from 'react';
import {
    Editor, 
    EditorState,
    RichUtils,
    convertFromRaw,
    convertToRaw
} from 'draft-js';

import 'draft-js/dist/Draft.css';


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
    const _onBoldClick = useCallback(() => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"))
    })

    const _onItalicClick = useCallback(() => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"))
    })

    const _onUnderlineClick = useCallback(() => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"))
    })

    const _onCodeClick = useCallback(() => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "CODE"))
    })


    return (
        <>
            <button onClick={_onBoldClick}>Bold</button>
            <button onClick={_onItalicClick}>Italic</button>
            <button onClick={_onUnderlineClick}>Underline</button>
            <button onClick={_onCodeClick}>Code</button>



            <Editor 
                editorState={editorState}
                handleKeyCommand={handleKeyCommand} 
                onChange={setEditorState} />
        </>
    )
}


export default MyEditor