const express = require('express');
const path = require('path');
const socket = require('socket.io');
let messages = [];
let users = [];

const app = express();
const server = app.listen(8000, () => {
    console.log('Server is running on Port:', 8000)
});
const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('join', (join) => {
        console.log('User join: ' + join.author + ' user id: ' + socket.id);
        users.push({name: join.author, id: socket.id});
        socket.broadcast.emit('join', {author: 'ChatBoot', content: join.author + ' has joined the conversation!'});
    });
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });
    socket.on('disconnect', () => {
        console.log('Oh, socket ' + socket.id + ' has left');
        const index = users.map(x => x.id).indexOf(socket.id);
        const user = users[index];
        const userName = user.name;
        socket.broadcast.emit('removeUser', {author: 'ChatBoot', content: userName + ' has left the conversation... :('});
        users.splice(index, 1);
    });
    console.log('I\'ve added a listener on message and disconnect events \n');
});

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
    res.render('index');
});
