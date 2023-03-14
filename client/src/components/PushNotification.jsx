import React, {useEffect, useState} from 'react'
import {createClient} from 'graphql-ws';
import NotificationsICon from '@mui/icons-material/Notifications'
import {GRAPHQL_SUBSCRIPTION_ENDPOINT} from "../utils/constants.jsx";
import {Badge, Menu, MenuItem} from "@mui/material";

const client = createClient({
    url: GRAPHQL_SUBSCRIPTION_ENDPOINT,
});

const query = `subscription Subscription {
                  notification {
                    message
                  }
                }`

function PushNotification() {
    const [invisible, setInvisible] = useState(true)
    const [notification, setNotification] = useState('')
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClose = () => {
        setAnchorEl(null)
        setNotification('')
        setInvisible(true)
    }
    const handleClick = (e) => {
        if (notification) {
            setAnchorEl(e.currentTarget)
        }
    }

    useEffect(() => {
        (async () => {
            const onNext = (data) => {
                setInvisible(false)
                const message = data?.data.notification.message
                setNotification(message)
            }
            await new Promise((resolve, reject) => {
                let result;
                client.subscribe(
                    {
                        query: query,
                    },
                    {
                        next: onNext,
                        error: reject,
                        complete: () => resolve(result),
                    },
                );
            });
        })()
    }, [])
    return (
        <>
            <Badge color={'secondary'} variant={'dot'} invisible={invisible}>
                <NotificationsICon onClick={handleClick}/>
            </Badge>
            <Menu anchorEl={anchorEl} onClose={handleClose} open={open}>
                <MenuItem onClick={handleClose}>{notification}</MenuItem>
            </Menu>
        </>
    )
}

export default PushNotification
