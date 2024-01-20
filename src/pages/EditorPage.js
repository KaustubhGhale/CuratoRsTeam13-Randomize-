import React, { useState, useRef, useEffect } from 'react';
import Client from '../components/Client';
//import Editor from '../components/Editor';
import CodeEditor from '../components/CodeEditor';

const EditorPage = () => {
    const [clients, setClients] = useState([
        {socketId:1, username:'Kaustubh G'},
        {socketId:1, username:'69'}
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
                <CodeEditor />
            </div>
        </div>
    );
};

export default EditorPage;