
import React, { useState } from 'react'
import { 
    EditorState, 
    convertToRaw, 
    convertFromRaw, 
    Editor, 
    RichUtils, 
}  from 'draft-js'
// import draftToHtml from 'draftjs-to-html;
// import { Editor } from 'react-draft-wysiwyg'
import './CollaborationNote.css'
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import Axios from 'axios';

function MyEditor() {
    const [editorState, setEditorState] = React.useState(
      () => EditorState.createEmpty(),
    );
  
    return <Editor editorState={editorState} onChange={setEditorState} />;
}
    

export default MyEditor