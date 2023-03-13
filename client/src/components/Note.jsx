import React, {useEffect, useMemo, useState} from 'react'
import {EditorState, ContentState, convertFromHTML, convertToRaw} from 'draft-js'
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import {useLoaderData, useLocation, useSubmit} from "react-router-dom";
import {debounce} from "@mui/material";

function Note() {
    const {note} = useLoaderData()
    const submit = useSubmit()
    const location = useLocation()
    const [editorState, setEditorState] = useState(() => {
        return EditorState.createEmpty()
    })
    const [rawHTML, setRawHTL] = useState(note.content)

    useEffect(() => {
        setRawHTL(note.content)
    },[note.content])

    useEffect(() => {
        const blocksFromHTML = convertFromHTML(note.content)
        const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks,blocksFromHTML.entityMap)
        setEditorState(EditorState.createWithContent(state))
    },[note.id])

    useEffect(() => {
        debouncedMemorized(rawHTML, note, location.pathname)
    }, [rawHTML, location.pathname])

    const debouncedMemorized = useMemo(() => {
        return debounce((rawHTML, note, pathname ) => {
            if (rawHTML === note.content) return
            submit({...note, content: rawHTML}, {
                method: 'post',
                action: pathname
            })
        }, 1000)
    }, [])

    const handleOnChange = (e) => {
        setEditorState(e)
        setRawHTL(draftToHtml(convertToRaw(e.getCurrentContent())))
    }

    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={handleOnChange}
            placeholder={'Write something...'}
        />
    )
}

export default Note
