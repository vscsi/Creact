import React, {useCallback, useEffect} from 'react';
import classes from "./CollaborationNote.module.css"
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

    //=== save content ===//



    //=== Style controls ===//
    
    //Inline Styles
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
    
    //Block Styles
    const _onH1Click = useCallback(() =>{
        setEditorState(RichUtils.toggleBlockType(editorState, "header-one"))
    })

    const _onH2Click = useCallback(() =>{
        setEditorState(RichUtils.toggleBlockType(editorState, "header-two"))
    })

    const _onH3Click = useCallback(() =>{
        setEditorState(RichUtils.toggleBlockType(editorState, "header-three"))
    })

    const _onH4Click = useCallback(() =>{
        setEditorState(RichUtils.toggleBlockType(editorState, "header-four"))
    })

    const _onH5Click = useCallback(() =>{
        setEditorState(RichUtils.toggleBlockType(editorState, "header-five"))
    })

    const _onH6Click = useCallback(() =>{
        setEditorState(RichUtils.toggleBlockType(editorState, "header-six"))
    })

    const UL = useCallback(() => {
        setEditorState(RichUtils.toggleBlockType(editorState, "unordered-list-item"))
    })

    const OL = useCallback(() => {
        setEditorState(RichUtils.toggleBlockType(editorState, "ordered-list-item"))
    })

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
            <Editor 
                editorState={editorState}
                handleKeyCommand={handleKeyCommand} 
                onChange={setEditorState} />
        </div>
    )
}


export default MyEditor