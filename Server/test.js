const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').Server(app)
const cors = require('cors');

const { users } = require('./helpers/users')

const io = require('socket.io')(http, {
    cors: {
        origin: true,
        methods: ["GET", "POST"],
    },
});

let openedRooms = [];

let messages = []
let id = 0;
io.on('connection', (socket) => {


    console.log(`user with id ${socket.id} has connected`);

    socket.on('disconnect', () => {
        console.log(`user has disconnected`);
    })

    socket.on('send', data => {
        const newData = {
            ...data,
            id,
            time: new Date().getTime(),
        }
        const sorted = [...messages, newData].sort((a, b) => a.time > b.time)
        messages = sorted

        id++;
        io.emit('sendResponse', sorted)
    })

    socket.on('attemptLogin', data => {
        const found = users.filter(item => {
            if (item.username === data.login && item.password === data.pass) {
                item.socketID = socket.id
            }
            return item.username === data.login && item.password === data.pass
        })

        if (found.length === 0) {
            io.emit('loginResponse', { error: "user not found", message: "błędny login lub hasło", logged: false })
            return 0;
        }
        io.emit('loginResponse', { error: "login succesful", message: "pomyślnie zalogowano", logged: true, roomName: found[0].roomName })
        socket.join(found[0].roomName)
    })
})


app.use(cors());

// app.get('/api', (req, res) => {
//     console.log('recived data');
// })


http.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})