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

let id = 0;
const messages = []

io.on('connection', (socket) => {

    const logout = () => {
        users.map(user => {
            if (user.socketID === socket.id) user.active = false
            return user
        })
    }

    console.log(`user with id ${socket.id} has connected`);

    socket.on('logout', () => logout())

    socket.on('disconnect', () => {
        logout()
        console.log(`user has disconnected`);
    })

    socket.on('getActiveUsers', () => {
        const active = users.filter(user => user.active)
        io.emit('getActiveUsersResponse', active)
    })

    socket.on('attemptLogin', data => {
        const found = users.filter(user => {
            if (user.username === data.login && user.password === data.pass) {
                user.active = true
                user.socketID = socket.id
            }
            return user.username === data.login && user.password === data.pass
        })

        if (found.length === 0) {
            io.to(socket.id).emit('loginResponse', { error: "user not found", message: "błędny login lub hasło", user: { logged: false } })
            return 0;
        }
        io.to(socket.id).emit('loginResponse', {
            error: "login succesful",
            message: "pomyślnie zalogowano",
            user: {
                logged: true,
                id: found[0].id,
                roomName: found[0].roomName,
                username: found[0].username
            }
        })
        socket.join(found[0].roomName)
    })

    socket.on('sendMessage', data => {
        const message = {
            ...data,
            id,
            time: new Date().toISOString()
        }
        id++;
        messages.push(message)
        const user = users.filter(user => user.id === data.to)[0].socketID
        io.to(user).emit('reciveMessage', message)
    })

    socket.on('getMessages', users => {
        const conversationMessages = messages.filter(message => {
            if ((message.from === users[0] && message.to === users[1]) || (message.from === users[1] && message.to === users[0])) {
                return message
            }
        })
        io.to(socket.id).emit('getMessagesResponse', conversationMessages)
    })
})


app.use(cors());

http.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})

