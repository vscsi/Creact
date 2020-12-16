// Import React dependencies.
import React, { useMemo, useState } from 'react'
// Import the Slate editor factory.
import { createEditor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, useSlate} from 'slate-react'



import { Button, Toolbar } from '../components'


const Toolbar = () => {
    const editor = useSlate()
    return (
      <div>
        <Button active={isBoldActive(editor)}>B</Button>
        <Button active={isItalicActive(editor)}>I</Button>
      </div>
    )
  }


const MyEditor = () => {
    const editor = useMemo(() => withReact(createEditor()), [])
    // Add the initial value when setting up our state.
    const [value, setValue] = useState([
      {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ])
  
    return (
      <Slate
        editor={editor}
        value={value}
        onChange={opts =>{
            setValue(opts.value)
        }}
      >
        <Toolbar/>
        <Editable />
      </Slate>
    )
  }

  export default MyEditor 