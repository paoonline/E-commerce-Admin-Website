import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorStyle = {
  borderRadius: '0px 0px 5px 5px',
  border: '1px solid #eaeaec',
  paddingLeft: '14px',
  paddingRight: '14px',
  marginTop: -7
}

const ToolbarStyle = {
  borderRadius: '5px 5px 0px 0px',
  border: '1px solid #eaeaec',
}

const TextEditor = (props) => {
  const html = props.description;
  const initData = () => {
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks, contentBlock.entityMap);
    return EditorState.createWithContent(contentState);
  }

  const [editor, setEditor] = useState(false)
  const [editorState, setEditorState] = useState(html !== undefined && html !== '<p></p>' ? initData() : EditorState.createEmpty())

  useEffect(() => {
    setEditor(true)
    return () => {
      setEditor(false)
    };
  }, [])

  const onEditorStateChange = (editorState) => {
    const editorSourceHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    let editorHandler
    // eslint-disable-next-line
    editorHandler = editorSourceHTML.match(/^<p/g) !== null ? editorSourceHTML : editorSourceHTML.replace(/<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g, '')
    props.onModelChange(editorHandler)

    setEditorState(editorState)
  };

  return (
    <div id="editor">
      {
        editor ?
          <Editor
            readOnly={props.readOnly ? true : false}
            handlePastedText={() => false}
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            editorStyle={EditorStyle}
            onEditorStateChange={editor && onEditorStateChange}
            toolbarStyle={ToolbarStyle}
            toolbar={{
              options: ['inline', 'list', 'textAlign', 'history', 'remove'],
              list: {
                options: ['unordered', 'ordered'],
              },
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
              },
            }}
          /> :
          null
      }
    </div >
  )
}

export default TextEditor