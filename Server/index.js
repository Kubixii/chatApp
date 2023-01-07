const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').Server(app)
const cors = require('cors');

const { users } = require('./helpers/users')

const io = require('socket.io')(http, {
    cors: {
        origin: true,
        // [
        //     'http://127.0.0.1:5173/',
        //     'http://192.168.1.10:5173/'
        // ],
        methods: ["GET", "POST"],
    },
});

let openedRooms = [];

io.on('connection', (socket) => {
    console.log(`user with id ${socket.id} has connected`);

    socket.on('disconnect', () => {
        console.log(`user has disconnected`);
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
        io.emit('loginResponse', { error: "login succesful", message: "pomyślnie zalogowano", logged: true })

    })

    socket.on('requestActiveUsers', () => {
        const active = users.filter(user => {
            if (user.socketID !== '') return {
                username: user.username,
                socketID: user.socketID
            }
        })

        io.emit('activeUsersResponse', active)
    })


    socket.on('logout', (data) => {
        users.map(user => {
            if (user.socketID === data.socketID) {
                user.socketID = ''
            }
            return user
        })

        console.log(users);
    })

    // socket.on('typingState', (data) => {
    //     io.emit('typingStateResponse', data)
    // })

    // socket.on('message', (data) => {
    //     io.to('room').emit('response', data)
    // })

    // socket.on('joinRoom', () => {
    //     socket.join('room')
    // })
})

app.use(cors());

app.get('/api', (req, res) => {
    console.log('recived data');
})


http.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})