import React, { Component } from 'react'
import { EditorState }  from 'draft-js'
// import draftToHtml from 'draftjs-to-html;
import { Editor } from 'react-draft-wysiwyg'
import './CollaborationNote.css'
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class MyEditor extends Component {
    constructor(props){
        super(props);
        this.state={
            editorState: EditorState.createEmpty()
        }
    }
    

    onEditorStateChange = editorState =>{
        this.setState({
            editorState
        })
    }

    render(){
        const { editorState } = this.state

        return(
            <div className="doc" >
                <Editor
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    placeholder="The message goes here..." 
                />
            </div>
        )
    }
}

export default MyEditor