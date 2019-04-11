const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 5000;
var rooms = 0;
server.listen(port, () => `Server running on port ${port}`);

io.on('connection', socket => {
  console.log('User connected...');
  // create a new game room
  socket.on('createGame', data => {
    socket.join('room-' + ++rooms);
    socket.emit('newGame', { name: data.name, room: 'room-' + rooms });
  });

  // connect the player 2 to requested room, error if room is full
  socket.on('joinGame', data => {
    var room = io.nsps['/'].adapter.rooms[data.room];
    if (room && room.length == 1) {
      socket.join(data.room);
      socket.broadcast.to(data.room).emit('player1', {});
      socket.emit('player2', { name: data.name, room: data.room });
    }
    else {
      socket.emit('err', { message: 'Sorry, the room is full!' });
    }
  });

  // handle turn played by either player and notify the other
  socket.on('playTurn', data => {
    socket.broadcast.to(data.room).emit('turnPlayed', {
      tile: data.tile,
      room: data.room
    });
  });

  // notify the players about the victor
  socket.on('gameEnded', data => {
    socket.broadcast.to(data.room).emit('gameEnd', data);
  });
});