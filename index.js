const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const PORT = process.env.PORT || 1337;

const data = [{}];

const app = express();
const server = http.Server(app);
const io = socketio(server);


app
  .use(express.json())
  .post('/q', (req, res) => {
    const { body } = req;

    data.push(body);

    console.log('Received new data:');
    console.log(body);

    io.emit('new data', body);

    res.status(201).json({ status: 'created' });
  })
  .get('/q', (req, res) => {
    res.json({ data });
  })
  .get('/q/latest', (req, res) => {
    res.json(data[data.length - 1]);
  })
  .use(express.static('./public'))

server.listen(PORT, () => { console.log(`Listening on :${PORT}`); })
