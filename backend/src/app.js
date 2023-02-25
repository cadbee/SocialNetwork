const app = require('express')();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');
const socketIO = require('socket.io');
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});


io.on("connection", socket =>{
  console.log('connect');

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
  socket.on('join', (data) => {
    socket.join(data.roomID);
    socket.broadcast.to(data.roomID).emit('user joined');
  });

  socket.on('message', (data) => {
    console.log(data);
    socket.to('1').emit('broad-message', {id: data.id, joke: data.joke, img: data.img});
  });
});


module.exports = {app, io}
