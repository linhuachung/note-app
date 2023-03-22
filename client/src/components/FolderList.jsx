import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import NewFolder from "./NewFolder.jsx";
import NoteComponent from "./NoteComponent.jsx";
import DroppableComponent from "./DroppableComponent.jsx";
import DraggableComponent from "./DraggableComponent.jsx";
import {updateFolderList} from "../utils/folderUtils.jsx";

function FolderList({folders}) {
    const {folderId} = useParams()
    const [activeFolderId, setActiveFolderId] = useState(folderId)

    const [foldersSort , setFoldersSort] = useState(folders)

    useEffect(()=> {
        setFoldersSort(folders)
    }, [folders])

    return (
        <DroppableComponent updateList={updateFolderList} itemSort={foldersSort} setItemSort={setFoldersSort} droppableId={'folder'} sx={{
            width: '100%',
            bgcolor: '#7D9D9C',
            height: '100%',
            padding: '10px',
            textAlign: 'left',
            overflowY: 'auto',
        }} title={"Folders"} icon={<NewFolder />}
        >
            {
                foldersSort?.map(({id, name},index) => {
                    return (
                        <DraggableComponent draggableId={id} index={index} key={id} >
                            <NoteComponent id={id} content={name} setActiveItem={setActiveFolderId} activeItemId={activeFolderId} itemId={id} url={'folders'}
                            />
                        </DraggableComponent>
                    )
                })
            }
        </DroppableComponent>

    )
}

export default FolderList
