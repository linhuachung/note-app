import React from 'react'
import {Card, CardContent, Typography} from "@mui/material";
import moment from "moment/moment.js";
import {Link} from "react-router-dom";

function NoteComponent({id, content, updatedAt, ...props}) {
    return (
        <Link to={`${props.url}/${id}`} style={{textDecoration: 'none', width: "100%"}} onClick={() => props.setActiveItem(id)}>
            <Card sx={{mb: '5px', backgroundColor: id === props.activeItemId ? 'rgb(255 211 140)' : props.itemId && null}}>
                <CardContent sx={{'&:last-child': {pb: '10px'}, padding: '10px'}}>
                    <div style={{fontStyle: '14px', fontWeight: 'bold'}}
                         dangerouslySetInnerHTML={{__html: `${content?.substring(0,30) || 'Empty'}`}}
                    />
                    {updatedAt && <Typography sx={{fontSize: '10px'}}>{moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>}
                </CardContent>
            </Card>
        </Link>
    )
}

export default NoteComponent
