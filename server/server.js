const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')

const port = process.env.PORT  || 3000;
var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('new user')

  socket.emit('newMessage', {
    from: 'doc',
    text: 'sup?',
    createdAt: 123
  })

  socket.on('createMessage', (message) => {
    console.log('Message', message)
  })

  socket.on('disconnect', function() {
    console.log('disconected from client')
  })
})


server.listen(port, function() {
  console.log(`Started up at port ${port}`)
  console.log(publicPath)
})
