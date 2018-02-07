const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')

const {generateMessage} = require('./utils/message')
const port = process.env.PORT  || 3000;
var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('new user')

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'))

  socket.on('createMessage', (message) => {
    console.log('Message', message)
    io.emit('newMessage', generateMessage(message.from, message.text))
    // socket.broadcast.emit('newMessage', {
    // //   from: message.from,
    // //   text: message.text,
    // //   createdAt: new Date().getTime()
    // // })
  })

  socket.on('disconnect', function() {
    console.log('disconected from client')
  })
})


server.listen(port, function() {
  console.log(`Started up at port ${port}`)
  console.log(publicPath)
})
