// src/App.js
import React from 'react';
import CodeEditor from './components/CodeEditor';
import Chat from './components/Chat';
import './App.css';

function App() {
  return (
    <div className="app">
      <CodeEditor />
      <Chat />
    </div>
  );
}

export default App;
