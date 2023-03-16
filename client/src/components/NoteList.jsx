import React, {useEffect, useState} from 'react'
import {Grid} from "@mui/material";
import {Outlet, useLoaderData, useNavigate, useParams, useSubmit} from "react-router-dom";
import {NoteAddOutlined} from "@mui/icons-material";
import DroppableComponent from "./DroppableComponent.jsx";
import DraggableComponent from "./DraggableComponent.jsx";
import NoteComponent from "./NoteComponent.jsx";

function NoteList() {
    const navigate = useNavigate()
    const {noteId, folderId} = useParams()
    const [activeNoteId, setActiveNoteId] = useState(noteId)
    const {folder} = useLoaderData()
    const submit = useSubmit()

    useEffect(() => {
        if (noteId) {
            setActiveNoteId(noteId)
            return
        }
        if (folder?.notes?.[0]) {
            navigate(`note/${folder.notes[0].id}`)
        }
    }, [noteId, folder.notes])

    const handleAddNewNote = () => {
        submit({
            content: '',
            folderId
        }, {method: 'post', action: `/folders/${folderId}`})
    }

    return (
        <Grid container height={'100%'}>
            <Grid item xs={4}
                  sx={{
                      width: '100%',
                      maxWidth: '360px',
                      bgcolor: "#F0EBE3",
                      height: '100%',
                      overflowY: 'auto',
                      padding: '10px',
                      textAlign: 'left'
                  }}
            >
                <DroppableComponent droppableId={'note'} handleAddNewItem={handleAddNewNote} title={"Notes"} icon={<NoteAddOutlined/>}>
                       {
                           folder?.notes.map(({id, content, updatedAt}, index) => {
                               return (
                                   <DraggableComponent draggableId={id} index={index} key={id}>
                                       <NoteComponent id={id} content={content} updatedAt={updatedAt} setActiveItem={setActiveNoteId} activeItemId={activeNoteId} itemId={noteId} url={'note'}
                                       />
                                   </DraggableComponent>
                               )
                           })
                       }
                </DroppableComponent>

            </Grid>
            <Grid item xs={8}>
                <Outlet/>
            </Grid>
        </Grid>
    )
}

export default NoteList
