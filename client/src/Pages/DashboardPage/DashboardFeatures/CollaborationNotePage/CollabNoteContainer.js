import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import { EditorState, convertToRaw, convertFromRaw }  from 'draft-js'
// import draftToHtml from 'draftjs-to-html;
import { Editor } from 'react-draft-wysiwyg'
import './CollaborationNote.css'
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class MyEditor extends Component {
    constructor(props){
        super(props);
        this.state= {  };
    }

    saveContent = debounce((content) => {
        fetch('/docs', {
            method: 'POST',
            body: JSON.stringify({
                content: convertToRaw(content),
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
    }, 5000);
    

    onEditorStateChange = editorState =>{
        const contentState = editorState.getCurrentContent();
        this.saveContent(contentState)
        this.setState({
            editorState
        })
    }

    
    componentDidMount() {
        let val = null;
        fetch("http://localhost:4000/workspace/docs").then(val = val.json())
        .then(rawContent => { 
            if (rawContent) {
                this.setState({ editorState: EditorState.createWithContent(convertFromRaw(rawContent)) })
            } else {
                this.setState({ editorState: EditorState.createEmpty() })
            }
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