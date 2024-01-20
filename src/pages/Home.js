import React, { useState } from 'react';
import { v4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const createNewRoom = (e) => {
        e.preventDefault();
        const id = v4   ();
        setRoomId(id);
        toast.success('Created a new room');
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('Room ID & Username is required');
            return;
        }

        // Redirect if wrong
        navigate(`/editor/${roomId}`, {
            state: {
                username,
            },
        });
    };

    const Enter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };

    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <img
                    className="homePageLogo"
                    src="/code-sync.png"
                    alt="code-sync-logo"
                />
                <h4 className="mainLabel">Enter Room ID & Username</h4>
                <div className="inputGroup">
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="ROOM ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={Enter}
                    />
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="USERNAME"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        onKeyUp={Enter}
                    />
                    <button className="btn joinBtn"onClick={joinRoom}>Join</button>
                    <span className="createInfo">
                        Don't have an invite code? Create your&nbsp;
                        <a onClick={createNewRoom} href="" className="createNewBtn">
                            new room
                        </a>
                    </span>
                </div>
            </div>
            <footer>
                <h4>
                    Built overnight by {''}
                    <a href="https://github.com/KaustubhGhale/CuratoRsTeam13-Randomize-">CuratoRs</a>
                </h4>
            </footer>
        </div>
    );
};

export default Home;
