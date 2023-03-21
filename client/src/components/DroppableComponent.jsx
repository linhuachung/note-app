import React from 'react'
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {Box, IconButton, List, Tooltip, Typography} from "@mui/material";

function DroppableComponent({droppableId, children, ...props}) {
    const onDragEnd = (res) => {
        if (!res.destination) return;
        // console.log(res)
        const items = Array.from(props.itemSort);
        const [reorderedItem] = items.splice(res.source.index, 1);
        items.splice(res.destination.index, 0, reorderedItem);
        // console.log(items)
        props.setItemSort(items);
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={droppableId}>
                {
                    (provided) => {
                        return (
                            <List
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                sx={props.sx}
                                subheader={
                                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <Typography sx={{fontWeight: 'bold'},props.title === 'Folders' ? {color: 'white'} : {color: 'black'}}>
                                            {props.title}
                                        </Typography>
                                        <Tooltip title={"Add Note"} onClick={props.handleAddNewItem}>
                                            <IconButton size={"small"}>
                                                {props.icon}
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                }
                            > {children}
                                {provided.placeholder}
                            </List>
                        )
                    }
                }
            </Droppable>
        </DragDropContext>
    )
}

export default DroppableComponent
