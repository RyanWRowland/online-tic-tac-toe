const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 5000;
server.listen(port, () => `Server running on port ${port}`);