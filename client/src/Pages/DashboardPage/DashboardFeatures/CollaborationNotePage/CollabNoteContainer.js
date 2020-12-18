import React, {useEffect} (() => {
    effect
    return () => {
        cleanup
    }
}, [input])}  from 'react';
import {
    Editor, 
    EditorState,
    convertFromRaw,
    convertToRaw
} from 'draft-js';
import 'draft-js/dist/Draft.css';


function MyEditor() {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );
   useEffect(() => {
       console.log(editorState)
       return () => {
           cleanup
       }
   }, [editorState])
  

  return <Editor editorState={editorState} onChange={setEditorState} />;
}


export default MyEditor