import React from 'react'
import { Draggable} from "react-beautiful-dnd";
import {ListItem} from "@mui/material";

function DraggableComponent({draggableId, index, id, children,...props}) {
    return (
            <Draggable draggableId={draggableId} index={index} key={id} clasName={"testttsadfasdf "}>
                {
                    (provided) => <ListItem{...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>{children}</ListItem>
                }
            </Draggable>
    )
}

export default DraggableComponent
