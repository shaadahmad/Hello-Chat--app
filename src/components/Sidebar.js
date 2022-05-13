import { Avatar, IconButton } from '@material-ui/core';

import React, { useState, useEffect } from 'react'
import './Sidebar.css';
import { ExitToApp, SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from '../firebase';
import { useStateValue } from '../StateProvider';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    const [seacrhTerm, setSearchTerm] = useState("")

    const [data, setData] = useState(rooms)
    
    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );
        return () => {
            unsubscribe();
        }
       
    }, []);
    console.log(user.displayName);
    useEffect(() => {
        if (seacrhTerm) 
        setData(rooms.filter((room) => {
            return room.data.name.toLowerCase().includes(seacrhTerm.toLowerCase())
        }))

    }, [seacrhTerm]);
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <h4>{user.displayName}</h4>
                    {/* <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton> */}
                    <IconButton>
                        <ExitToApp onClick={() => {
                            sessionStorage.clear()
                            window.location.reload()
                        }} />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start a new chat" type="text" onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {data.length && seacrhTerm ?data.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                )): rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar;