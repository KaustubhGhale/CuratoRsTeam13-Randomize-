import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with your server address


const transformOperation = (localOperation, operation) => {
    const transformedOperation = {
      apply: (code) => {
        return code + '\n// Transformed Operation Applied';
      },
    };
  
    return transformedOperation;
  };
  

const createOperationFromChange = ({ from, to, text }) => {
    const operation = {
        apply: (code) => {
            return code.substring(0, from) + text + code.substring(to);
        },
    };
    return operation;
};

  
const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [localOperation, setLocalOperation] = useState(null);
  const [language, setLanguage] = useState('c_cpp');

  useEffect(() => {
    socket.on('initial-code', (initialCode) => {
      setCode(initialCode);
    });

    socket.on('code-update', (operation) => {
      applyRemoteOperation(operation);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCodeChange = (newCode) => {
    const newLocalOperation = createOperationFromChange({ from: 0, to: code.length, text: newCode });
    setCode(newLocalOperation.apply(code));
    setLocalOperation(newLocalOperation);
    socket.emit('code-update', newLocalOperation);
  };
  
  const applyRemoteOperation = (operation) => {
    setCode(operation.apply(code));
    setLocalOperation(operation);
  };
  
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="code-editor">
      <div className="container">
        <label>Language:</label>
        <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
          <option value="c_cpp">C/C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
        <button className="run-button" onclick="handleRunButtonClick()">Run</button>
      </div>
      <AceEditor
        mode={language}
        theme="monokai"
        onChange={handleCodeChange}
        value={code}
        name="collaborative-code-editor"
        editorProps={{ $blockScrolling: true }}
        width="100%"
        height="100vh"
      />
    </div>
  );
};

export default CodeEditor;