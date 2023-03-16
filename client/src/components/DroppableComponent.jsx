import React from 'react'
import {Droppable} from "react-beautiful-dnd";
import {Box, IconButton, List, Tooltip, Typography} from "@mui/material";

function DroppableComponent({droppableId, children, ...props}) {
    return (
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
                                    <Typography sx={{fontWeight: 'bold'}} sx={props.title === 'Folders' ? {color: 'white'} : {color: 'black'}}>
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
    )
}

export default DroppableComponent
