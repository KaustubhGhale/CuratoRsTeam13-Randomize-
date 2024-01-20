// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 4000;

const codeState = {
  code: '',
  localOperations: {},
};

io.on('connection', (socket) => {
  // Send initial code to the new client
  socket.emit('initial-code', codeState.code);

  // Listen for code updates from clients
  socket.on('code-update', (operation) => {
    if (codeState.localOperations[socket.id]) {
      const transformedOperation = transformOperation(
        codeState.localOperations[socket.id],
        operation
      );
      codeState.code = transformedOperation.apply(codeState.code);
      delete codeState.localOperations[socket.id];
    } else {
      codeState.code = operation.apply(codeState.code);
    }

    // Broadcast the updated code to other clients
    socket.broadcast.emit('code-update', operation);
  });

  // Listen for chat messages
  socket.on('chat-message', (message) => {
    io.emit('chat-message', message);
  });

  // Listen for disconnect and clean up local operations
  socket.on('disconnect', () => {
    delete codeState.localOperations[socket.id];
  });
});

const transformOperation = (localOperation, remoteOperation) => {
  // Implement Operational Transformation logic here
  // ...

  return transformedOperation;
};

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

server.close();