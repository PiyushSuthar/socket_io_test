const http = require('http')
const { Server } = require('socket.io')
const app = require('express')()

const server = http.createServer(app)
const io = new Server(server)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("disconnect", reason => {
        console.log(`User Disconnected: ${reason}`)
    })

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        socket.broadcast.emit("chat message", msg)
    });
})
server.listen(3000, () => {
    console.log("Server running on port 3000")
})