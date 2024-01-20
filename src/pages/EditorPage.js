import React, { useState, useRef, useEffect } from 'react';
import Client from '../components/Client';

const EditorPage = () => {
    const [clients, setClients] = useState([
        {socketId:1, username:'Amey Sachin Darokar'},
        {socketId:2, username:'Kaustubh File'}
    ]);
    return (
        <div className="mainWrap">
            <div className="aside">
                <div className="asideInner">
                    <div className="logo">
                        <img
                            className="logoImage"
                            src="/code-sync.png"
                            alt="logo"
                        />
                    </div>
                    <h3>Connected</h3>
                    <div className="clientsList">
                        {clients.map((client) => (
                            <Client
                                key={client.socketId}
                                username={client.username}
                            />
                        ))}
                    </div>
                </div>
                <button className="btn copyBtn">Copy ROOM ID</button>
                <button className="btn leaveBtn">Leave</button>
            </div>
            <div className="editorWrap">
            </div>
        </div>
    );
};

export default EditorPage;