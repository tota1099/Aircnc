const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');
const config = require('config');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(config.DBHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

/* Em produção é recomendado usar o redis */
const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

// middleware
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

if(process.env.NODE_ENV === 'test'){
    module.exports = app;
} else {
    server.listen(3333);
}
