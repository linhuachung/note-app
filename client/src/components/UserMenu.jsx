import React, {useContext, useState} from 'react'
import {AuthContext} from "../context/AuthProvider.jsx";
import {Avatar, Box, Menu, MenuItem, Typography} from "@mui/material";

function UserMenu() {
    const {user: {displayName,photoURL, auth}} = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleClick = (e) =>{
        setAnchorEl(e.currentTarget)
    }
    const handleLogut = () => {
        auth.signOut()
    }
    return (
        <>
            <Box sx={{display: 'flex'}} onClick={handleClick}>
                <Typography>
                    {displayName}
                </Typography>
                <Avatar alt={'avatar'} src={photoURL} sx={{width: 24, height: 24, marginLeft: '5px'}}/>
            </Box>
            <Menu id={'basic-menu'} anchorEl={anchorEl} onClose={handleClose} open={open}>
                <MenuItem onClick={handleLogut}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default UserMenu
